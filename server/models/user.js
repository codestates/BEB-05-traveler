const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: String,
    token_amount: Number,
    eth_amount: Number,
    waiting_time: {
        type: Date,
        default: Date.now,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// 회원가입
userSchema.methods.saveUser = async function () {
    const _hash = await bcrypt.hash(this.password, 10);
    this.password = _hash;

    return await this.save();
};

// 회원정보 수정 : nickname 외 기타 사용자 입력 정보. 현재기준으로는 nickname, password가 있으나, password 변경은 별도로 관리.
userSchema.statics.setUserInfo = async function (user_id, nickname) {
    return await this.findOneAndUpdate({ user_id: user_id }, {nickname: nickname}, {new: true});
};

// 회원정보 수정 : password
userSchema.statics.setPassword = async function (user_id, password) {
    const _hash = bcrypt.hash(password, 10);
    return await this.findOneAndUpdate({ user_id: user_id }, {password: _hash}, {new: true});
};

// 20 token 변경(user_id)
userSchema.statics.setEthAmountById = async function (user_id, amount) {
    return await this.findOneAndUpdate({ user_id: user_id }, {eth_amount: amount}, {new: true});
};

// 20 token 변경(nickname)
userSchema.statics.setEthAmountByNickname = async function (nickname, amount) {
    return await this.findOneAndUpdate({ nickname: nickname }, {eth_amount: amount}, {new: true});
};

// nft token 변경(user_id)
userSchema.statics.setTokenAmountById = async function (user_id, amount) {
    return await this.findOneAndUpdate({ user_id: user_id }, {token_amount: amount}, {new: true});
};

// nft token 변경(nickname)
userSchema.statics.setTokenAmountByNickname = async function (nickname, amount) {
    return await this.findOneAndUpdate({ nickname: nickname }, {token_amount: amount}, {new: true});
};

// 게시글 등록시 time-lock 설정
userSchema.statics.setWaitingTime = async function (user_id) {
    return await this.findOneAndUpdate({ user_id: user_id }, { waiting_time: new Date()}, {new: true});
};

// 비밀번호 일치여부 확인
userSchema.statics.checkPassword = async function (user_id, password) {
    const _userInfo = await this.find({ user_id: user_id });
    return await bcrypt.compare(password, _userInfo[0].password);
};

// 회원정보 요청 (user_id)
userSchema.statics.getUserInfoById = async function (user_id) {
    return await this.find({ user_id: user_id });
};

// 회원정보 요청 (nickname)
userSchema.statics.getUserInfoByNickname = async function (nickname) {
    return await this.find({ nickname: nickname });
};

// 회원정보 요청 (user_address)
userSchema.statics.getUserInfoByAddress = async function (address) {
    return await this.find({ address: address });
};

module.exports = mongoose.model("User", userSchema);
