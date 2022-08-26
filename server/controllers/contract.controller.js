const abi20 = require("../abi20");
const abi721 = require("../abi721");
const address20 = require("../address20");
const address721 = require("../address721");

const cron = require("node-cron");
const nftmodel = require("../models/nft");
const usermodel = require("../models/user");
const Web3 = require("web3");

const web3 = new Web3(process.env.RPCURL);
// 스마트컨트랙트 객체 생성. ERC20 / ERC721.
const contract20 = new web3.eth.Contract(abi20, address20);
const contract721 = new web3.eth.Contract(abi721, address721);

const getTransactions = cron.schedule('* * * * * *', async function () {
    // 블록체인에 기록된 nft의 수와 DB에 저장된 nft의 수를 가져온다.
    console.log("1초마다 블록체인네트워크를 탐색합니다.")
    const totalSupply = await contract721.methods.totalSupply().call();
    console.log("블록체인에 저장된 NFT의 수: ", totalSupply);
    const nftCount = await nftmodel.getAllNfts().sort({ token_id: -1 }).limit(1);
    console.log("데이터베이스에 저장된 NFT의 수: ", nftCount);

    // 새로운 nft만 추가해서 DB에 적재한다.
    for ( let i = nftCount+1 ; i <= totalSupply ; i++ ){
        console.log("새로운 NFT 정보를 업데이트합니다.")
        const user_address = await contract721.methods.ownerOf(i).call();
        const token_uri = await contract721.methods.tokenURI(i).call();
        const userInfo = await usermodel.getUserInfoByAddress(user_address);
        const newNft = {
            user_id: userInfo.user_id,
            user_address: user_address,
            token_id: i,
            token_uri: token_uri

        }
    },
    {
        scheduled: false,
    }
);

module.exports = getTransactions;
