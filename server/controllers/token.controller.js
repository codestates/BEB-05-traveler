const model = require('../models');

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