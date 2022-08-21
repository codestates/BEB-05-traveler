const usermodel = require('../models/user');
const jwt = require('jsonwebtoken');
const Web3 = require('web3');

// infura를 web3 프로바이더로 사용함
const web3 = new Web3(process.env.RPCURL);

module.exports = {
    // 회원 로그인
    login: async (req, res) => {
        const userInfo = await usermodel.getUserInfoById(req.body.user_id)

        if(!userInfo){
            return res.status(400).send({data:null, message: "Not autorized"});
        }
        else {
            const checkUserInputData = await usermodel.checkPassword(req.body.user_id, req.body.password);

            if(!checkUserInputData){
                return res.status(400).send({data:null, message: "Not autorized"});
            } else {
                const userData = {
                    user_id: userInfo.user_id,
                    nickname: userInfo.nickname,
                    address: userInfo.address,
                    token_amount: userInfo.token_amount,
                    eth_amount: userInfo.eth_amount,
                    waiting_time: userInfo.waiting_time,
                    created_at: userInfo.created_at,
                }

                const accessToken = jwt.sign(userData, process.env.ACCESS_SECRET, {expiresIn: "10m"});

                return res.status(200).send({ data: { accessToken: accessToken }, message: `Logged in` })
            }
            
        }
    },

    // 회원가입
    join: async (req, res) => {
        const inputID = await usermodel.getUserInfoById(req.body.user_id);
        if(inputID){
            return res.status(400).send({data:null, message: "User ID already exists"})
        }
        const inputNickname = await usermodel.getUserInfoById(req.body.nickname)
        if(inputNickname){
            return res.status(400).send({data:null, message: "Nickname already exists"})
        }
        
        const newAccount = await web3.eth.personal.newAccount(req.body.password);

        const userData = {
            user_id: req.body.user_id,
            nickname: req.body.nickname,
            address: newAccount,
            token_amount: 0,
            eth_amount: 0,
            waiting_time: new Date(),
            created_at: new Date(),
        }

        const createUser = usermodel.saveUser(userData);
        
        return res.status(200).send({data:createUser, message: "New User account created!"})
    },

    // 사용자 정보 조회
    info: async (req, res) => {
        const userInfo = await usermodel.getUserInfoById(req.body.user_id);

        return res.status(200).send({data: userInfo, message: "Completed search"})
    }
}