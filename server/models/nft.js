const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
    user_id : {
        type : String,
        required : true
    },
    user_address : {
        type : String,
        required : true,
    },
    token_id : {
        type : Number,
        required : true,
        unique : true
    },
    token_uri : {
        type : String,
        required : true
    },
    isselling : {
        type: Boolean,
        default: false
    },
    price : {
        type: Number,
        default: Number.MAX_SAFE_INTEGER
    },
})

// nft 저장
nftSchema.statics.saveNft = async function(obj) {
    const _nft = new this({
        user_id: obj.user_id,
        user_address: obj.user_address,
        token_id: obj.token_id,
        token_uri: obj.token_uri,
    });
    return await _nft.save();
}

// nft 판매 등록
nftSchema.statics.sellNft = async function(token_id, price) {
    return await this.findOneAndUpdate({token_id: token_id}, {isselling : true, price: price});
}

// nft 구매
nftSchema.statics.buynft = async function(token_id, buyer_id, buyer_address) {
    const _nft = {
        user_id: buyer_id,
        user_address: buyer_address,
        isselling: false,
        price: Number.MAX_SAFE_INTEGER
    }
    return await this.findOneAndUpdate({token_id}, _nft);
}

// nft 전체 조회
nftSchema.statics.getAllNfts = async function() {
    return await this.find({});
}

// 사용자의 nft만 조회
nftSchema.statics.getNftByUserId = async function(user_id) {
    return await this.find({user_id: user_id});
}

module.exports = mongoose.model('Nft', nftSchema);