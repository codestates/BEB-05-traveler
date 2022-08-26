const abi20 = require("../abi20");
const abi721 = require("../abi721");
const address20 = require("../address20");
const address721 = require("../address721");

const usermodel = require("../models/user");
const jwt = require("jsonwebtoken");
const Web3 = require("web3");
const { use } = require("../routes");
const nftmodel = require("../models/nft");

// infura를 web3 프로바이더로 사용함
const web3 = new Web3(process.env.RPCURL);
const contract20 = new web3.eth.Contract(abi20, address20);
const contract721 = new web3.eth.Contract(abi721, address721);

module.exports = {
    // 회원 로그인
    login: async (req, res) => {
        try {
            const userInfo = await usermodel.getUserInfoById(req.body.user_id);
            if (!userInfo.length) {
                return res
                    .status(400)
                    .send({ data: null, message: "Not autorized" });
            } else {
                const checkUserInputData = await usermodel.checkPassword(
                    req.body.user_id,
                    req.body.password
                );

                if (!checkUserInputData) {
                    return res
                        .status(400)
                        .send({ data: null, message: "Not autorized" });
                } else {
                    // 20토큰과 721토큰은 블록체인 네트워크에서 최신 정보를 받아와서 업데이트!
                    const ethAmount = await contract20.methods
                        .balanceOf(userInfo[0].address)
                        .call();
                    const nftAmount = await contract721.methods
                        .balanceOf(userInfo[0].address)
                        .call();

                    const updateEthAmount = await usermodel.setEthAmountById(
                        userInfo[0].user_id,
                        ethAmount
                    );
                    const updateNftAmount = await usermodel.setTokenAmountById(
                        userInfo[0].user_id,
                        nftAmount
                    );
                    console.log(
                        "DB 업데이트된 20 Token의 양: ",
                        updateEthAmount,
                        " / NFT의 양: ",
                        updateNftAmount
                    );

                    // user정보 객체를 만들어 토큰에 담아 응답
                    const userData = {
                        user_id: userInfo[0].user_id,
                        nickname: userInfo[0].nickname,
                        address: userInfo[0].address,
                        token_amount: nftAmount,
                        eth_amount: ethAmount,
                        waiting_time: userInfo[0].waiting_time,
                        created_at: userInfo[0].created_at,
                    };

                    const accessToken = jwt.sign(
                        userData,
                        process.env.ACCESS_SECRET,
                        { expiresIn: "10h" }
                    );

                    console.log("accessToken: ", accessToken);

                    return res.status(200).send({
                        data: { accessToken: accessToken },
                        message: "Logged in",
                    });
                }
            }
        } catch (err) {
            // console.log(err);
            res.status(400).send({
                data: null,
                message: "Can't execute request",
            });
        }
    },

    // 회원가입
    join: async (req, res) => {
        try {
            const inputID = await usermodel.getUserInfoById(req.body.user_id);

            // inputID 를 length 로 수정
            if (inputID.length !== 0) {
                console.log(inputID, "test test");
                return res
                    .status(400)
                    .send({ data: null, message: "User ID already exists" });
            }

            const inputNickname = await usermodel.getUserInfoById(
                req.body.nickname
            );

            // inputNickname 을 length 로 수정
            if (inputNickname.length !== 0) {
                return res
                    .status(400)
                    .send({ data: null, message: "Nickname already exists" });
            }

            const newAccount = await web3.eth.accounts.create(
                req.body.password
            );

            const userData = {
                user_id: req.body.user_id,
                nickname: req.body.nickname,
                password: req.body.password,
                address: newAccount.address,
                token_amount: 0,
                eth_amount: 0,
                waiting_time: new Date(),
                created_at: new Date(),
            };
            // const createUser = usermodel.saveUser(userData);

            const createUser = await new usermodel(userData).saveUser();
            // console.log(createUser);'

            return res.status(200).send({
                data: createUser,
                message: "New User account created!",
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                data: null,
                message: "Can't execute request",
            });
        }
    },

    // 사용자 정보 조회
    info: async (req, res) => {
        try {
            const accessToken = req.headers.authorization;

            if (!accessToken) {
                return res
                    .status(404)
                    .send({ data: null, message: "Invalid access token" });
            } else {
                const userInfo = jwt.verify(
                    accessToken,
                    process.env.ACCESS_SECRET
                );

                console.log("User information: ", userInfo);

                // 20토큰과 721토큰은 블록체인 네트워크에서 최신 정보를 받아와서 업데이트!
                const ethAmount = await contract20.methods
                    .balanceOf(userInfo.address)
                    .call();
                const nftAmount = await contract721.methods
                    .balanceOf(userInfo.address)
                    .call();

                const updateEthAmount = await usermodel.setEthAmountById(
                    userInfo.user_id,
                    ethAmount
                );
                const updateNftAmount = await usermodel.setTokenAmountById(
                    userInfo.user_id,
                    nftAmount
                );
                console.log(
                    "DB 업데이트된 20 Token의 양: ",
                    updateEthAmount,
                    " / NFT의 양: ",
                    updateNftAmount
                );

                // 20토큰과 NFT 정보를 업데이트하고, 최신 정보를 userInfo 객체에 담아 응답
                const userData = {
                    user_id: userInfo.user_id,
                    nickname: userInfo.nickname,
                    address: userInfo.address,
                    token_amount: nftAmount,
                    eth_amount: ethAmount,
                    waiting_time: userInfo.waiting_time,
                    created_at: userInfo.created_at,
                };
                console.log(userData);

                const user_nftInfo_sell = [];
                const user_nftInfo_notsell = [];
                const nftList = await nftmodel.getNftByUserId(userData.user_id);

                console.log(nftList);

                for (i = 0; i < nftList.length; i++) {
                    if (nftList[i].isselling === true) {
                        user_nftInfo_sell.push({
                            content_id: nftList[i].token_id,
                            link: nftList[i].token_uri,
                        });
                    }
                    if (nftList[i].isselling === false) {
                        user_nftInfo_notsell.push({
                            content_id: nftList[i].token_id,
                            link: nftList[i].token_uri,
                        });
                    }
                }
                return res.status(200).send({
                    data: userData,
                    user_nftInfo_sell,
                    user_nftInfo_notsell,
                    message: "Completed search",
                });
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({
                data: null,
                message: "Can't execute request",
            });
        }
    },
};
