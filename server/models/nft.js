const mongoose = require("mongoose");

// 최초 접속 시 클라이언트에 n개의 NFT 정보 전송
const quantity = 4;

const nftSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_address: {
        type: String,
        required: true,
    },
    token_id: {
        type: Number,
        required: true,
        unique: true,
    },
    token_uri: {
        type: String,
        required: true,
    },
    isselling: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        default: Number.MAX_SAFE_INTEGER,
    },
});

// nft 저장
nftSchema.methods.saveNft = async function () {
    return await this.save();
};

// nft 판매 등록
nftSchema.statics.sellNft = async function (token_id, price) {
    return await this.findOneAndUpdate(
        { token_id: token_id },
        { isselling: true, price: price }
    );
};

// nft 판매 등록 취소
nftSchema.statics.cancelSale = async function (token_id) {
    return await this.findOneAndUpdate(
        { token_id: token_id },
        { isselling: false, price: Number.MAX_SAFE_INTEGER }
    );
};

// nft 구매
nftSchema.statics.buynft = async function (token_id, buyer_id, buyer_address) {
    const _nft = {
        user_id: buyer_id,
        user_address: buyer_address,
        isselling: false,
        price: Number.MAX_SAFE_INTEGER,
    };
    return await this.findOneAndUpdate({ token_id }, _nft);
};

// 기존 DB 등록된 NFT의 소유자 정보 변경
nftSchema.statics.changeOwner = async function (token_id, newOwner_id, newOwner_address) {
    const updateNFT = {
        user_id: newOwner_id,
        user_address: newOwner_address,
        isselling: false,
        price: Number.MAX_SAFE_INTEGER
    }
    return await this.findOneAndUpdate({ token_id}, updateNFT)
}

// nft 전체 조회
nftSchema.statics.getAllNfts = async function () {
    return await this.find({});
};

// 사용자의 nft만 조회
nftSchema.statics.getNftByUserId = async function (user_id) {
    return await this.find({ user_id: user_id });
};

// nft token_id로 토큰 정보 조회
nftSchema.statics.getInfoByTokenId = async function (token_id) {
    return await this.find({ token_id: token_id });
};

// nft token_id로 토큰 정보 조회
nftSchema.statics.getInfoBySellingStatus = async function (status) {
    return await this.find({ isselling: status });
};

// 최신 게시물 n개 조회
nftSchema.statics.getRecentNft = async function() {
    return await this.find({}).sort({token_id : -1}).limit(quantity);
}

module.exports = mongoose.model("Nft", nftSchema);
