const postmodel = require('../models/post');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const Web3 = require('web3');
const web3 = new Web3(process.env.RPCURL);

const abi20 = require("../abi20");
const address20 = require("../address20");
const contract20 = new web3.eth.Contract(abi20, address20);

// 게시글 보상 토큰의 양 설정
const token = 100 * (10 ** 18);
const REWARD = web3.utils.toBN(token)

module.exports = {
    // 모든 게시글의 정보를 DB에서 읽어와 클라이언트로 송신
    posts: async (req, res) => {
        try {
            const postInfo = await postmodel.getAllPosts();

            console.log("모든 게시글의 조회가 완료되었습니다.")
            return res.status(200).send({data: postInfo, message: "Completed search"})
        } catch (err) {
            console.error(err)
            return res.status(404).send({data: null})
        }
    },

    // 클라이언트에서 작성된 새로운 글을 DB에 저장
    newpost: async (req, res) => {
        try {
            const accessToken = req.headers.authorization;
            if (!accessToken) {
                return res.status(404).send({ data: null, message: "Invalid access token" });
            } 
            else {
                const token = accessToken.split(" ")[0];
                if (!token) {
                    return res.status(404).send({ data: null, message: "Invalid token" });
                } 
                else {
                    // 새로운 게시글 저장
                    const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);
                    const postsAll = await postmodel.getPostId();
                    const postsCount = postsAll[0].post_id;
                    const newPost = {
                        user_id: userInfo.user_id,
                        title: req.body.title,
                        content: req.body.content,
                        image: req.body.image,
                        place_name: req.body.place_name,
                        place_address: req.body.place_address,
                        reward: REWARD
                    };
                    const inputPost = postmodel.savePost(newPost, postsCount+1);
                    console.log('새로운 게시글을 저장합니다.');

                    // 보상 지급
                    let userBalance;
                    const data = contract20.methods.transfer(userInfo.address, REWARD).encodeABI();
                    const rawTransaction = {"to": address20, "gas": 100000, "data": data};
                    web3.eth.accounts.signTransaction(rawTransaction, process.env.ADMIN_WALLET_PRIVATE_KEY)
                        .then( signedTX => web3.eth.sendSignedTransaction(signedTX.rawTransaction))
                        .then( req => {
                            return contract20.methods.balanceOf(userInfo.address).call();
                            })
                            .then(bal => {
                                console.log(bal);
                                return true;
                            })
                        .catch(err =>{
                            console.error(err, "Transaction failure")
                        })
                    
                    console.log("게시글 작성에 대한 보상으로 토큰이 지급되었습니다.")
                    return res.status(200).send({data: inputPost, message: "Transaction success"})
                }
            }
        } catch (err) {
            console.error(err)
            return res.status(404).send({data: null})
        }
    },

    // 게시글의 내용 수정
    post_update: async (req, res) => {
        try {
            const updatePost = await postmodel.setPost(req.body)

            console.log('게시글 수정이 완료되었습니다.')
            return res.status(200).send({data: updatePost, message: "Post updated"})
        } catch (err) {
            console.error(err)
            return res.status(404).send({data: null})
        }
    },

    // 특정 게시글 삭제 & 게시글 작성 보상으로 지급된 토큰 회수
    post_delete: async (req, res) => {
        try {
            const accessToken = req.headers.authorization;
            if (!accessToken) {
                return res.status(404).send({ data: null, message: "Invalid access token" });
            } 
            else {
                const token = accessToken.split(" ")[0];
                if (!token) {
                    return res.status(404).send({ data: null, message: "Invalid token" });
                } 
                else {
                    const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);

                    const data = contract20.methods.getBack(userInfo.address, REWARD).encodeABI();
                    const rawTransaction = {"to": address20, "gas": 100000, "data": data};
                    web3.eth.accounts.signTransaction(rawTransaction, process.env.ADMIN_WALLET_PRIVATE_KEY)
                        .then( signedTX => web3.eth.sendSignedTransaction(signedTX.rawTransaction))
                        .then( req => {
                            return contract20.methods.balanceOf(userInfo.address).call();
                            })
                            .then(bal => {
                                console.log(bal);
                                return true;
                            })
                        .catch(err =>{
                            return console.error(err, "Transaction failure")
                        })

                    const delPost = postmodel.removePost(req.body.post_id);
                    
                    console.log("게시글이 삭제되어, 보상으로 지급된 토큰을 회수하였습니다.")
                    return res.status(200).send({data: delPost, message: "Post removed"})
                }
            }
        } catch (err) {
            console.error(err)
            return res.status(404).send({data: null})
        }
    },

    // 특정 사용자가 작성한 게시글을 user_id로 검색
    postbyid : async (req,res) => {
        try {
            const accessToken = req.headers.authorization;

            if (!accessToken) {
                return res
                    .status(404)
                    .send({ data: null, message: "Invalid access token" });
            } else {
                if (!accessToken) {
                    return res
                        .status(404)
                        .send({ data: null, message: "Invalid access token" });
                } else {
                    const userInfo = jwt.verify(
                        accessToken,
                        process.env.ACCESS_SECRET
                    );

                    const postInfoById = await postmodel.getPostByUserId(userInfo.user_id);

                    console.log("사용자가 요청한 게시글 조회를 완료하였습니다.")
                    return res.status(200).send({data: postInfoById, message: "Complete Search"});
                }
            }
        } catch (err) {
            console.error(err)
            return res.status(404).send({data: null})
        }
    },

    // 게시글 번호로 게시글의 정보 조회
    postbypostid : async (req, res) => {
        try {
            const postInfoByPostid = await postmodel.getPostByNumber(req.params.post_id);

            console.log("사용자가 요청한 게시글 조회를 완료하였습니다.")
            return res.status(200).send({data : postInfoByPostid, message : "Complete Search"});
        } catch (err) {
            console.error(err)
            return res.status(404).send({data: null})
        }
    }
}

