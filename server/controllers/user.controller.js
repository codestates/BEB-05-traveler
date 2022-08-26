const abi20 = require("../abi20");
const abi721 = require("../abi721");
const address20 = require("../address20");
const address721 = require("../address721");

const usermodel = require("../models/user");
const jwt = require("jsonwebtoken");
const Web3 = require("web3");
const user = require("../models/user");

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
                    const ethAmount = await contract20.methods.balanceOf(userInfo[0].address);
                    const nftAmount = await contract721.methods.balanceOf(userInfo[0].address);

                    const updateEthAmount = await usermodel.setEthAmountById(userInfo[0].user_id, ethAmount);
                    const updateNftAmount = await usermodel.setTokenAmountById(userInfo[0].user_id, nftAmount);
                    console.log("DB 업데이트된 20 Token의 양: ", updateEthAmount, " / NFT의 양: ", updateNftAmount);
                    
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

                    return res.status(200).send({
                        data: { accessToken: accessToken },
                        message: `Logged in`,
                    });
                }
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({ data: null, message: "Can't execute request"});
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

            const newAccount = await web3.eth.accounts.create(req.body.password);

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

            return res.status(200).send({ data: createUser, message: "New User account created!" });
        } catch (err) {
            console.log(err);
            res.status(400).send({ data: null, message: "Can't execute request"});
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
                // const token = accessToken.split(".")[1];
                console.log(accessToken);
                if (!accessToken) {
                    return res
                        .status(404)
                        .send({ data: null, message: "Invalid access token" });
                } else {
                    const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);

                    // 20토큰과 721토큰은 블록체인 네트워크에서 최신 정보를 받아와서 업데이트!
                    const ethAmount = await contract20.methods.balanceOf(userInfo[0].address);
                    const nftAmount = await contract721.methods.balanceOf(userInfo[0].address);

                    const updateEthAmount = await usermodel.setEthAmountById(userInfo[0].user_id, ethAmount);
                    const updateNftAmount = await usermodel.setTokenAmountById(userInfo[0].user_id, nftAmount);
                    console.log("DB 업데이트된 20 Token의 양: ", updateEthAmount, " / NFT의 양: ", updateNftAmount);

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
                    return res
                        .status(200)
                        .send({ data: userData, message: "Completed search" });
                }
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({ data: null, message: "Can't execute request"});
        }
    },
};