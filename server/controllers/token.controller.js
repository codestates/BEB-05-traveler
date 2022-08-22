const abi20 = require("../abi20");
const abi721 = require("../abi721");
const address20 = require("../address20");
const address721 = require("../address721");

const Web3 = require('web3');
const web3 = new Web3(process.env.RPCURL);
const contract20 = new web3.eth.Contract(abi20, address20);
const contract721 = new web3.eth.Contract(abi721, address721);

const nftmodel = require('../models/nft');

module.exports = {
    transfer_20: (req, res) => {
        console.log("20토큰을 전송합니다.")
    },

    transfer_721: (req, res) => {
        console.log("721토큰을 전송합니다.")

    },

    mint: (req, res) => {
        console.log("NFT를 발행합니다.")
    },

    buynft: (req, res) => {
        console.log("NFT를 구입합니다.")
    },

    sellnft: (req, res) => {
        console.log("NFT를 판매합니다.")
    },

    findallnft: (req, res) => {
        console.log("모든 NFT 정보를 불러옵니다.")
        return res.status(200).send('모든 NFT 정보를 불러옵니다.')
    }
};