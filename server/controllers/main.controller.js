const postmodel = require('../models/post');
const nftmodel = require('../models/nft')

module.exports = {
    // 모든 게시물과 NFT 정보 조회
    findAll: async (req, res) => {
        const postInfo = await postmodel.getAllPosts();
        const nftInfo = await nftmodel.getAllNfts();

        return res.status(200).send({data: {postInfo, nftInfo}, message: "Completed search"})
    }
}