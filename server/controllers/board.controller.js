const postmodel = require('../models/post');
const usermodel = require('../models/user');

const Web3 = require('web3');
const web3 = new Web3(process.env.RPCURL);

const abi20 = require("../abi20");
const address20 = require("../address20");
const contract20 = new web3.eth.Contract(abi20, address20);

// 게시글 보상 토큰의 양 설정
const REWARD = 10000;

module.exports = {
    posts: async (req, res) => {
        console.log('모든 게시글을 불러옵니다.');
        const postInfo = await postmodel.getAllPosts();

        return res.status(200).send({data: postInfo, message: "Completed search"})
    },

    newpost: async (req, res) => {
        console.log('새로운 게시글을 저장합니다.')
        const postsCount = await postmodel.getAllPosts().sort({ post_id: -1 }).limit(1);
        const newPost = {
            // 요청 헤더로 인증토큰이 전송되면 다르게 구현해야함
            user_id: req.body.user_id,
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            place_name: req.body.place_name,
            place_address: req.body.place_address,
            reward: REWARD
        };
        const inputPost = postmodel.savePost(newPost, postsCount+1);

        // 보상 지급
        let userBalance;
        const userInfo = await usermodel.getUserInfoById(req.body.user_id);
        const data = contract20.methods.transfer(process.env.ADMIN_WALLET_ACOUNT, userInfo.address, REWARD).encodeABI();
        const rawTransaction = {"to": address20, "gas": 100000, "data": data};
        web3.eth.account.signTransaction(rawTransaction, process.env.ADMIN_WALLET_PRIVATE_KEY)
            .then( signedTX => web3.eth.sendSignedTransaction(signedTX.rawTransaction))
            .then( req => {
                userBalance = contract20.methods.balanceOf(userInfo.address).call();
                return true;
            })
            .catch(err =>{
                console.error(err, "Transaction failure")
            })
        
        // user 20토큰 정보 업데이트
        const updateInfo = await usermodel.setEthAmountById(req.body.user_id, userBalance);
        
        return res.status(200).send({data: updateInfo, message: "Transaction success"})
    },

    post_update: async (req, res) => {
        console.log('게시글의 내용을 수정합니다.')
        const updatePost = await postmodel.setPost(req.body)

        return res.status(200).send({data: updatePost, message: "Post updated"})
    },

    post_delete: async (req, res) => {
        console.log('게시글을 삭제합니다.')
        const userInfo = await usermodel.getUserInfoById(req.body.user_id);

        // 1. 스마트컨트랙트에 owner 권한으로 token을 회수하는 함수(getBack)를 추가해야함
        // 2. 해결해야할 문제
        //    사용자가 게시글에 대한 보상을 받은 뒤 토큰을 모두 사용하면,
        //    이후 게시글을 삭제하더라도 지급된 토큰을 회수할 수 없다.
        //    사용자는 새로운 아이디를 만들어 보상을 노리고 동일한 게시물을 올리는 등 치팅을 시도할 수 있다.
        let userBalance;
        const data = contract20.methods.getBack(userInfo.address, REWARD).encodeABI();
        const rawTransaction = {"to": address20, "gas": 100000, "data": data};
        web3.eth.account.signTransaction(rawTransaction, process.env.ADMIN_WALLET_PRIVATE_KEY)
            .then( signedTX => web3.eth.sendSignedTransaction(signedTX.rawTransaction))
            .then( req => {
                userBalance = contract20.methods.balanceOf(userInfo.address).call();
                return true;
            })
            .catch(err =>{
                return console.error(err, "Transaction failure")
            })
        
        // user 20토큰 정보 업데이트
        const updateInfo = await usermodel.setEthAmountById(req.body.user_id, userBalance);
        const delPost = postmodel.removePost(req.body.post_id);
        
        return res.status(200).send({data: delPost, message: "Post removed"})
    }
}

