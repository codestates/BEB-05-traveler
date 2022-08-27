const abi20 = require("../abi20");
const abi721 = require("../abi721");
const address20 = require("../address20");
const address721 = require("../address721");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { NFTStorage, File } = require("nft.storage");

const Web3 = require("web3");
const web3 = new Web3(process.env.RPCURL);

const contract20 = new web3.eth.Contract(abi20, address20);
const contract721 = new web3.eth.Contract(abi721, address721);

const nftmodel = require("../models/nft");
const usermodel = require("../models/user");

module.exports = {
    transfer_20: async (req, res) => {
        try {
            const accessToken = req.headers.authorization;

            if (!accessToken) {
                return res
                    .status(404)
                    .send({ data: null, message: "Invalid access token" });
            } else {
                const token = accessToken.split(" ")[1];

                if (!token) {
                    return res
                        .status(404)
                        .send({ data: null, message: "Invalid access token" });
                } else {
                    const userInfo = jwt.verify(
                        token,
                        process.env.ACCESS_SECRET
                    );

                    const senderAddress = userInfo.address;

                    let recipientAddress;
                    if (req.body.user_id) {
                        const recipientInfo = await usermodel.getUserInfoById(
                            req.body.user_id
                        );
                        recipientAddress = recipientInfo[0].address;
                    } else if (req.body.nickname) {
                        const recipientInfo =
                            await usermodel.getUserInfoByNickname(
                                req.body.nickname
                            );
                        recipientAddress = recipientInfo[0].address;
                    } else {
                        recipientAddress = req.body.recipient;
                    }
                    console.log("수신자: ", recipientAddress);

                    const amount = req.body.amount;

                    const data = contract20.methods
                        .transferFrom(senderAddress, recipientAddress, amount)
                        .encodeABI();

                    const rawTransaction = {
                        to: address20,
                        gas: 1000000,
                        data: data,
                    };

                    const signedTX = await web3.eth.accounts.signTransaction(
                        rawTransaction,
                        process.env.ADMIN_WALLET_PRIVATE_KEY
                    );

                    const sendingTX = await web3.eth.sendSignedTransaction(
                        signedTX.rawTransaction
                    );

                    // 블록체인에서 최신 정보를 받아와 업데이트
                    const ethAmount = await contract20.methods
                        .balanceOf(senderAddress)
                        .call();

                    const updateEthAmount = await usermodel.setEthAmountById(
                        userInfo.user_id,
                        ethAmount
                    );
                    console.log(
                        "DB 업데이트된 20 Token의 양: ",
                        updateEthAmount
                    );

                    res.status(200).send({
                        data: sendingTX,
                        message: "Transfer success",
                    });
                }
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({
                data: null,
                message: "Can't execute request",
            });
        }
    },

    transfer_721: async (req, res) => {
        try {
            const accessToken = req.headers.authorization;

            if (!accessToken) {
                return res
                    .status(404)
                    .send({ data: null, message: "Invalid access token" });
            } else {
                const token = accessToken.split(" ")[1];
                console.log("token", token);
                if (!token) {
                    return res
                        .status(404)
                        .send({ data: null, message: "Invalid access token" });
                } else {
                    const userInfo = jwt.verify(
                        token,
                        process.env.ACCESS_SECRET
                    );

                    const senderAddress = userInfo.address;

                    let recipientAddress;
                    if (req.body.user_id) {
                        const recipientInfo = await usermodel.getUserInfoById(
                            req.body.user_id
                        );
                        recipientAddress = recipientInfo[0].address;
                    } else if (req.body.nickname) {
                        const recipientInfo =
                            await usermodel.getUserInfoByNickname(
                                req.body.nickname
                            );
                        recipientAddress = recipientInfo[0].address;
                    } else {
                        recipientAddress = req.body.recipient;
                    }
                    console.log("수신자: ", recipientAddress);

                    const tokenId = req.body.token_id;

                    const nft_owner = await contract721.methods.ownerOf(
                        tokenId
                    );

                    if (nft_owner !== senderAddress) {
                        return res
                            .status(404)
                            .send({ data: null, message: "Not owner of NFT" });
                    } else {
                        const nft_owner = await contract721.methods.ownerOf(
                            tokenId
                        );
                        console.log("NFT 소유자: ", nft_owner);

                        const data = contract721.methods
                            .safeTransferFrom(
                                senderAddress,
                                recipientAddress,
                                tokenId
                            )
                            .encodeABI();

                        const rawTransaction = {
                            to: address721,
                            gas: 1000000,
                            data: data,
                        };

                        const signedTX =
                            await web3.eth.accounts.signTransaction(
                                rawTransaction,
                                process.env.ADMIN_WALLET_PRIVATE_KEY
                            );

                        const sendingTX = await web3.eth.sendSignedTransaction(
                            signedTX.rawTransaction
                        );

                        res.status(200).send({
                            data: sendingTX,
                            message: "Transfer success",
                        });
                    }
                }
            }
        } catch (err) {
            console.error(err);
            res.status(400).send({
                data: null,
                message: "Can't execute request",
            });
        }
    },

    mint: async (req, res) => {
        try {
            const accessToken = req.headers.authorization;
            if (!accessToken) {
                return res
                    .status(404)
                    .send({ data: null, message: "Invalid access token" });
            } else {
                const token = accessToken.split(" ")[1];
                if (!token) {
                    return res
                        .status(404)
                        .send({ data: null, message: "Invalid access token" });
                } else {
                    const userInfo = jwt.verify(
                        token,
                        process.env.ACCESS_SECRET
                    );

                    const client = new NFTStorage({
                        token: process.env.NFT_STORAGE_KEY,
                    });

                    const imageFile = new File(
                        [await fs.promises.readFile(req.file.path)],
                        req.file.originalname,
                        {
                            type: req.file.mimetype,
                        }
                    );

                    const nftCID = await client.store({
                        name: req.body.img[0],
                        description: req.body.img[1],
                        image: imageFile,
                    });

                    console.log(nftCID);

                    console.log("nft url: ", nftCID.url);

                    const newTokenURI =
                        "https://ipfs.io/ipfs/" +
                        nftCID.url.replace("ipfs://", "");

                    const data = contract721.methods
                        .mintNFT(userInfo.address, newTokenURI)
                        .encodeABI();

                    const rawTransaction = {
                        to: address721,
                        gas: 1000000,
                        data: data,
                    };

                    const signedTX = await web3.eth.accounts.signTransaction(
                        rawTransaction,
                        process.env.ADMIN_WALLET_PRIVATE_KEY
                    );

                    const sendingTX = await web3.eth.sendSignedTransaction(
                        signedTX.rawTransaction
                    );

                    console.log(sendingTX);

                    senderBalance = await contract721.methods
                        .balanceOf(userInfo.address)
                        .call({ from: process.env.ADMIN_WALLET_ADDRESS });

                    const updateSenderInfo = await usermodel.setTokenAmountById(
                        userInfo.user_id,
                        senderBalance
                    );
                    res.status(200).send({
                        data: updateSenderInfo,
                        message: "Your NFT is created",
                    });
                }
            }
        } catch (err) {
            console.error(err);
            res.status(400).send({
                data: null,
                message: "Can't execute request",
            });
        }
    },

    buynft: async (req, res) => {
        try {
            const accessToken = req.headers.authorization;
            if (!accessToken) {
                return res
                    .status(404)
                    .send({ data: null, message: "Invalid access token" });
            } else {
                const token = accessToken.split(" ")[1];

                if (!token) {
                    return res
                        .status(404)
                        .send({ data: null, message: "Invalid access token" });
                } else {
                    const userInfo = jwt.verify(
                        token,
                        process.env.ACCESS_SECRET
                    );

                    const recipientAddress = userInfo.address;

                    let senderAddress;
                    if (req.body.user_id) {
                        const senderInfo = await usermodel.getUserInfoById(
                            req.body.user_id
                        );
                        senderAddress = senderInfo[0].address;
                    } else if (req.body.nickname) {
                        const senderInfo =
                            await usermodel.getUserInfoByNickname(
                                req.body.nickname
                            );
                        senderAddress = senderInfo[0].address;
                    } else {
                        senderAddress = req.body.recipient;
                    }

                    const tokenId = req.body.token_id;
                    const price = req.body.price;
                    const nft_owner = await contract721.methods.ownerOf(
                        tokenId
                    ).call();

                    console.log(nft_owner);
                    console.log(senderAddress);

                    if (nft_owner !== senderAddress) {
                        return res
                            .status(404)
                            .send({
                                data: null,
                                message: "Seller isn't owner",
                            });
                    } else {
                        console.log("현재 NFT 소유자: ", nft_owner);

                        const data = contract721.methods
                            .buyNFT(
                                senderAddress,
                                recipientAddress,
                                tokenId,
                                price
                            )
                            .encodeABI();

                        const rawTransaction = {
                            to: address721,
                            gas: 10000000,
                            data: data,
                        };

                        const signedTX =
                            await web3.eth.accounts.signTransaction(
                                rawTransaction,
                                process.env.ADMIN_WALLET_PRIVATE_KEY
                            );

                        const sendingTX = await web3.eth.sendSignedTransaction(
                            signedTX.rawTransaction
                        );

                        console.log(sendingTX);

                        res.status(200).send({
                            data: sendingTX,
                            message: "Transaction success",
                        });
                    }
                }
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({
                data: null,
                message: "Can't execute request",
            });
        }
    },

    sellnft: async (req, res) => {
        // 판매 등록만 하기 때문에 DB의 isSelling, price 값만 변경
        try {
            if (!accessToken) {
                return res
                    .status(404)
                    .send({ data: null, message: "Invalid access token" });
            } else {
                const token = accessToken.split(" ")[1];

                if (!token) {
                    return res
                        .status(404)
                        .send({ data: null, message: "Invalid access token" });
                } else {
                    const userInfo = jwt.verify(
                        token,
                        process.env.ACCESS_SECRET
                    );
                    const userId = userInfo.user_id;

                    const tokenId = req.body.token_id;
                    const nftPrice = req.body.price;
                    const tokenInfo = await nftmodel.getInfoByTokenId(tokenId);

                    if (userId !== tokenInfo.user_id) {
                        res.status(404).send({
                            data: null,
                            message: "Not owner of NFT",
                        });
                    } else {
                        const registration = await nftmodel.sellNft(
                            tokenId,
                            nftPrice
                        );
                        res.status(200).send({
                            data: registration,
                            message: "Sales-Registration completed",
                        });
                    }
                }
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({
                data: null,
                message: "Can't execute request",
            });
        }
    },

    // NFT의 판매 등록 취소
    cancelsale: async (req, res) => {
        try {
            if (!accessToken) {
                return res
                    .status(404)
                    .send({ data: null, message: "Invalid access token" });
            } else {
                const token = accessToken.split(" ")[1];

                if (!token) {
                    return res
                        .status(404)
                        .send({ data: null, message: "Invalid access token" });
                } else {
                    const userInfo = jwt.verify(
                        token,
                        process.env.ACCESS_SECRET
                    );
                    const userId = userInfo.user_id;

                    const tokenId = req.body.token_id;
                    const tokenInfo = await nftmodel.getInfoByTokenId(tokenId);

                    if (userId !== tokenInfo.user_id) {
                        res.status(404).send({
                            data: null,
                            message: "Not owner of NFT",
                        });
                    } else {
                        const cancelResist = await nftmodel.cancelSale(tokenId);
                        res.status(200).send({
                            data: cancelResist,
                            message: "Sales-Registration canceled",
                        });
                    }
                }
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({
                data: null,
                message: "Can't execute request",
            });
        }
    },

    findallnft: async (req, res) => {
        try {
            const allNFTsInfo = await nftmodel.getAllNfts();
            return res.status(200).send({
                data: { allNFTsInfo },
                message: "모든 NFT 정보를 불러옵니다.",
            });
        } catch (err) {
            console.error(err);
            res.status(400).send({
                data: null,
                message: "Can't execute request",
            });
        }
    },

    market: async (req, res) => {
        try {
            const sellingList = await nftmodel.getInfoBySellingStatus(true);

            return res.status(200).send({
                data: sellingList,
                message: "판매 등록된 NFT 정보를 불러옵니다.",
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                data: null,
                message: "Can't execute request",
            });
        }
    },
};
