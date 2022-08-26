const abi721 = require("../abi721");
const address721 = require("../address721");
const Web3 = require("web3");
const web3 = new Web3(process.env.RPCURL);

const contract721 = new web3.eth.Contract(abi721, address721);

const postmodel = require("../models/post");
const nftmodel = require("../models/nft");
const nft = require("../models/nft");

module.exports = {
    // 최근 게시물과 NFT 정보 조회
    findAll: async (req, res) => {
        const postInfo = await postmodel.getRecentPost();
        // const totalNFT = await contract721.methods.totalSupply().call();
        // console.log(totalNFT);
        totalNFT = 30;
        const nftInfo = await Promise.all(
            [totalNFT, totalNFT - 1, totalNFT - 2, totalNFT - 3].map(
                async (i) => {
                    const link = await contract721.methods.tokenURI(i).call();
                    console.log("test");
                    return {
                        content_id: i,
                        link,
                    };
                }
            )
        );

        return res
            .status(200)
            .send({ data: { postInfo, nftInfo }, message: "Completed search" });
    },
};
