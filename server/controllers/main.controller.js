const postmodel = require("../models/post");
const nftmodel = require("../models/nft");

module.exports = {
    // n개의 최근 게시물과 NFT 정보 조회
    findAll: async (req, res) => {
        try {
            console.log("최근 작성된 게시글을 조회합니다.");
            const postInfo = await postmodel.getRecentPost();
            console.log("최근 작성된 게시글을 조회합니다.", postInfo.length)
            const nftInfo = await nftmodel.getRecentNft();
            console.log("최근 발행된 NFT를 조회합니다.", nftInfo.length)

            return res
                .status(200)
                .send({ data: { postInfo, nftInfo }, message: "Completed search" });
        } catch (err) {
            console.error(err);
            return res.status(404).send({data: null, message: "Search failure"});
        }
    },
};
