const usermodel = require("../models/user");
const jwt = require("jsonwebtoken");
const Web3 = require("web3");

// infura를 web3 프로바이더로 사용함
const web3 = new Web3(process.env.RPCURL);

module.exports = {
    // 회원 로그인
    login: async (req, res) => {
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
                const userData = {
                    user_id: userInfo[0].user_id,
                    nickname: userInfo[0].nickname,
                    address: userInfo[0].address,
                    token_amount: userInfo[0].token_amount,
                    eth_amount: userInfo[0].eth_amount,
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
    },

    // 회원가입
    join: async (req, res) => {
        console.log(req.body, "tttttttt");
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

        // const newAccount = await web3.eth.personal.newAccount(
        //     req.body.password
        // );

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

        return res
            .status(200)
            .send({ data: createUser, message: "New User account created!" });
    },

    // 사용자 정보 조회
    info: async (req, res) => {
        console.log(req);
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
                const userInfo = jwt.verify(
                    accessToken,
                    process.env.ACCESS_SECRET
                );

                console.log(userInfo, "확인중");

                const userData = {
                    user_id: userInfo.user_id,
                    nickname: userInfo.nickname,
                    address: userInfo.address,
                    token_amount: userInfo.token_amount,
                    eth_amount: userInfo.eth_amount,
                    waiting_time: userInfo.waiting_time,
                    created_at: userInfo.created_at,
                };
                console.log(userData);
                return res
                    .status(200)
                    .send({ data: userData, message: "Completed search" });
            }
        }
    },
};