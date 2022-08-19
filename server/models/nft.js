const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
    user_id : String,
    token : String,
    token_uri : String,
    isselling : Boolean,
    price : Number,
    user_address : String
})

module.exports = mongoose.model('nft', nftSchema);