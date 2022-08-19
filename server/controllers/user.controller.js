const model = require('../models');

module.exports = {
    login: async (req, res) => {
        const userInfo = await model.finduser({/*검색 조건 user_id 와 입력된 password 일치*/})

        if(!userInfo){
            return res.status(405).send({data:null, message: "Not autorized"});
        }
        else {
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
            const refreshToken = jwt.sign(userData, process.env.REFRESH_SECRET, {expiresIn: "1d"});

            return res.status(200).cookie("refreshToken", refreshToken, {
                domain: `lacalhost`,
                path: `/`,
                sameSite: `none`,
                httpOnly: true,
                secure: true
            }).send({ data: { accessToken: accessToken }, message: `Logged in` })
        }
    },

    join: (req, res) => {
        const userData = {
            user_id: req.body.user_id,
            nickname: req.body.nickname,
            address: {/* ????? */},
            token_amount: 0,
            eth_amount: 0,
            waiting_time: new Date(),
            created_at: new Date(),
        }

        {/* 모델 객체에 userData를 저장하는 함수 */}
    },

    info: (req, res) => {
        const userInfo = await model.finduser({/*검색 조건 user_id*/})

        const userData = {
            user_id: userInfo.user_id,
            nickname: userInfo.nickname,
            address: userInfo.address,
            token_amount: userInfo.token_amount,
            eth_amount: userInfo.eth_amount,
            waiting_time: userInfo.waiting_time,
            created_at: userInfo.created_at,
        }

    }
}