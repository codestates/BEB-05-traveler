const postmodel = require("../models/post");
const nftmodel = require("../models/nft");

module.exports = {
    // n개의 최근 게시물과 NFT 정보 조회
    findAll: async (req, res) => {
        try {
            const postInfo = await postmodel.getRecentPost();
            const nftInfo = await nftmodel.getRecentNft();

            console.log("최근 업데이트된 게시물과 NFT 정보를 조회하였습니다.")
            return res
                .status(200)
                .send({ data: { postInfo, nftInfo }, message: "Completed search" });
        } catch (err) {
            console.error(err);
            return res.status(404).send({data: null, message: "Search failure"});
        }
    },
};
