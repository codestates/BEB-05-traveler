const model = require('../models');

module.exports = {
    posts: (req, res) => {
        console.log('모든 게시글을 불러옵니다.')
        return res.status(200).send('모든 게시글을 불러옵니다.')

    },

    newpost: (req, res) => {
        console.log('새로운 게시글을 저장합니다.')

    },

    post_update: (req, res) => {
        console.log('게시글의 내용을 수정합니다.')

    },

    post_delete: (req, res) => {
        console.log('게시글을 삭제합니다.')

    }
}