const abi20 = require("../abi20");
const abi721 = require("../abi721");
const address20 = require("../address20");
const address721 = require("../address721");

const cron = require("node-cron");
const nftmodel = require("../models/nft");
const usermodel = require("../models/user");
const Web3 = require("web3");

const web3 = new Web3(process.env.RPCURL);
const contract721 = new web3.eth.Contract(abi721, address721);

const getTransactions = cron.schedule(
    "* */1 * * * *",
    async function () {
        // 1. 블록체인에 기록된 nft의 수와 DB에 저장된 nft의 수 비교
        // 2. 블록체인에 기록된 nft의 수가 더 많은 경우에는 새로운 NFT의 정보만 추가로 읽어와서 DB에 저장
        const totalSupply = await contract721.methods.totalSupply().call();

        const nftModels = await nftmodel.getAllNfts();
        const nftCount = nftModels.length;

        console.log(
            "DB에 저장된 NFT의 양: ",
            nftCount,
            " // 블록체인에 기록된 NFT의 양: ",
            totalSupply
        );

        const nftInexArr = [];
        for (let i = nftCount + 1; i <= totalSupply; i++) {
            nftInexArr.push(i);
        }

        for await (i of nftInexArr) {
            const user_address = await contract721.methods.ownerOf(i).call();
            const token_uri = await contract721.methods.tokenURI(i).call();
            const userInfo = await usermodel.getUserInfoByAddress(user_address);
            const newNft = {
                user_id: userInfo.user_id,
                user_address: user_address,
                token_id: i,
                token_uri: token_uri,
            };
            try {
                const createNFT = await new nftmodel(newNft).saveNft();

                console.log(i, "번째 NFT가 DB에 저장되었습니다.");
            } catch (error) {
                console.log(error);
            }
        }
    },
    {
        scheduled: false,
    }
);

module.exports = getTransactions;
