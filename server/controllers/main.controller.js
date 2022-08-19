const model = require('../models');

module.exports = {
    findAll: (req, res) => {
        console.log('모든 게시물과 NFT를 가져옵니다.')
        return res.status(200).send('모든 게시물과 NFT를 가져옵니다.')

    }
}