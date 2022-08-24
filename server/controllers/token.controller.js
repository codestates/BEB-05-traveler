const abi20 = require("../abi20");
const abi721 = require("../abi721");
const address20 = require("../address20");
const address721 = require("../address721");
const jwt = require("jsonwebtoken");
const { NFTStorage, File, Blob } = require("nft.storage");
const fs = require("fs");

const nftstorage = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });

const Web3 = require("web3");
const web3 = new Web3(process.env.RPCURL);

// const Provider = require("@truffle/hdwallet-provider");
// const provider = new Provider(process.env.PRI_KEY, process.env.RPCURL);
// const web3 = new Web3(provider);

const contract20 = new web3.eth.Contract(abi20, address20);
const contract721 = new web3.eth.Contract(abi721, address721);

const nftmodel = require("../models/nft");
const usermodel = require("../models/user");
const { default: Upload } = require("antd/lib/upload/Upload");

module.exports = {
    transfer_20: async (req, res) => {
        // req : user 정보(user_id, nickname, sender_address)는 토큰으로 온다.
        // password는 body
        // recipient(user_id or nickname), amount는 body

        const sender = "토큰을 복호화해서 address";
        let recipientInfo;
        if (req.body.recipient_id) {
            recipientInfo = await usermodel.getUserInfoById(
                req.body.recipient_id
            );
        }
        if (req.body.recipient_nickname) {
            recipientInfo = await usermodel.getUserInfoByNickname(
                req.body.recipient_nickname
            );
        }
        if (req.body.recipient_address) {
            recipientInfo = await usermodel.getUserInfoByAddress(
                req.body.recipient_address
            );
        }

        const recipientAddress = recipientInfo.address;

        let senderBalance;
        let recipientBalance;
        const data = contract20.methods
            .transfer(sender, recipientAddress, amount)
            .encodeABI();
        const rawTransaction = { to: address20, gas: 100000, data: data };
        web3.eth.account
            .signTransaction(
                rawTransaction,
                process.env.ADMIN_WALLET_PRIVATE_KEY
            )
            .then((signedTX) =>
                web3.eth.sendSignedTransaction(signedTX.rawTransaction)
            )
            .then((req) => {
                senderBalance = contract20.methods.balanceOf(sender).call();
                recipientBalance = contract20.methods
                    .balanceOf(recipientAddress)
                    .call();
                return true;
            })
            .catch((err) => {
                console.error(err, "Transaction failure");
            });

        const updateSenderInfo = await usermodel.setEthAmountById(
            "토큰을 복호화해서 user_id",
            senderBalance
        );
        const updateRecipientInfo = await usermodel.setEthAmountById(
            recipientInfo.user_id,
            recipientBalance
        );

        return res.status(200).send({
            data: { updateSenderInfo, updateRecipientInfo },
            message: "Transaction success",
        });
    },

    transfer_721: async (req, res) => {
        const sender = "토큰을 복호화해서 address";
        let recipientInfo;
        if (req.body.recipient_id) {
            recipientInfo = await usermodel.getUserInfoById(
                req.body.recipient_id
            );
        }
        if (req.body.recipient_nickname) {
            recipientInfo = await usermodel.getUserInfoByNickname(
                req.body.recipient_nickname
            );
        }
        if (req.body.recipient_address) {
            recipientInfo = await usermodel.getUserInfoByAddress(
                req.body.recipient_address
            );
        }

        const recipientAddress = recipientInfo.address;

        let senderBalance;
        let recipientBalance;
        const data = contract721.methods
            .transferFrom(sender, recipientAddress, token_id)
            .encodeABI();
        const rawTransaction = { to: address721, gas: 100000, data: data };
        web3.eth.account
            .signTransaction(
                rawTransaction,
                process.env.ADMIN_WALLET_PRIVATE_KEY
            )
            .then((signedTX) =>
                web3.eth.sendSignedTransaction(signedTX.rawTransaction)
            )
            .then((req) => {
                senderBalance = contract721.methods.balanceOf(sender).call();
                recipientBalance = contract721.methods
                    .balanceOf(recipientAddress)
                    .call();
                return true;
            })
            .catch((err) => {
                console.error(err, "Transaction failure");
            });

        const updateSenderInfo = await usermodel.setTokenAmountById(
            "토큰을 복호화해서 user_id",
            senderBalance
        );
        const updateRecipientInfo = await usermodel.setTokenAmountById(
            recipientInfo.user_id,
            recipientBalance
        );

        return res.status(200).send({
            data: { updateSenderInfo, updateRecipientInfo },
            message: "Transaction success",
        });
    },

    mint: async (req, res) => {
        const accessToken = req.headers.authorization;
        console.log(accessToken, "hihi");

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
                const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);

                const client = new NFTStorage({
                    token: process.env.NFT_STORAGE_TOKEN,
                });

                const imageFile = new File(
                    req.file.path,
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

                const newTokenURI =
                    "https://ipfs.io/ipfs/" + nftCID.url.replace("ipfs://", "");

                console.log(newTokenURI);

                // Contract mintNFT 함수 실행하는 트랜잭션 발행
                let senderBalance;
                const data = contract721.methods
                    .mintNFT(userInfo.address, newTokenURI)
                    .encodeABI();

                const rawTransaction = {
                    // to: address721,
                    to: "0x21e73194294e09F969Bed0e12435cdB3CD5BEcF0",
                    gas: 100000,
                    data: data,
                };

                //https://dapp-world.com/smartbook/send-transaction-using-web3-in-node-project-RETu

                const test = await web3.eth.accounts.signTransaction(
                    rawTransaction,
                    process.env.ADMIN_WALLET_PRIVATE_KEY
                );

                const test2 = await web3.eth.sendSignedTransaction(
                    test.rawTransaction
                );

                const test3 = await contract721.methods
                    .balanceOf(userInfo.address)
                    .call();

                console.log(test3);

                // web3.eth
                //     .signTransaction(
                //         rawTransaction,
                //         process.env.ADMIN_WALLET_PRIVATE_KEY
                //     )
                //     .then((signedTx) =>
                //         web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                //     )
                //     .then((req) => {
                //         senderBalance = contract721.methods
                //             .balanceOf(userInfo.address)
                //             .call();
                //         return true;
                //     })
                //     .catch((err) => {
                //         console.error(err, "Minting failure");
                //     });

                // // 몽고DB 의 user정보 업데이트.
                // const updateSenderInfo = await usermodel.setTokenAmountById(
                //     userInfo.address,
                //     senderBalance
                // );

                // return res.status(200).send({
                //     data: updateSenderInfo,
                //     message: "Minting completed",
                // });
            }
        }
    },

    buynft: async (req, res) => {
        // 판매등록만...트랜잭션 x
        const { token_id, buyer_id, payment } = req.body;

        const data = contract721.methods
            .buyNFT(sender, recipientAddress, token_id, payment)
            .encodeABI();
        const rawTransaction = { to: address721, gas: 100000, data: data };

        web3.eth.account
            .signTransaction(
                rawTransaction,
                process.env.ADMIN_WALLET_PRIVATE_KEY
            )
            .then((signedTX) =>
                web3.eth.sendSignedTransaction(signedTX.rawTransaction)
            )
            .then((req) => {
                senderBalance = contract721.methods.balanceOf(sender).call();
                recipientBalance = contract721.methods
                    .balanceOf(recipientAddress)
                    .call();
                return true;
            })
            .catch((err) => {
                console.error(err, "Transaction failure");
            });

        const buyResult = nftmodel.buynft(token_id, buyer_id, recipientAddress);
        return res
            .status(200)
            .send({ data: buyResult, message: "NFT를 구매합니다" });
    },

    sellnft: async (req, res) => {
        const { user_id, token_id, price } = req.body;
        const haveNFT = "판매하고자하는 nft를 소유했는지 확인절차";
        const sellResult = nftmodel.sellnft(token_id, price);

        return res
            .status(200)
            .send({ data: sellResult, message: "NFT를 판매합니다." });
    },

    findallnft: async (req, res) => {
        console.log(req);

        // console.log("모든 NFT 정보를 불러옵니다.");
        // const data = await contract721.methods
        //     .getMarketList()
        //     .call({ from: test_account });
        // console.log(data);
        return res.status(200).send("모든 NFT 정보를 불러옵니다.");
    },
};
