const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    user_id : {
        type : String,
        required : true,
        unique : true
    },
    nickname : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    address : String,
    token_amount : Number,
    eth_amount : Number,
    waiting_time : {
        type : Date,
        default : Date.now
    },
    created_at : {
        type : Date,
        default : Date.now
    },
})

// 회원가입
userSchema.statics.saveUser = async function(obj) {
    const _hash = bcrypt.hash(obj.password, 10);
    const _user = new this({
        user_id: obj.user_id,
        nickname: obj.nickname,
        password: _hash,
        address: obj.address,
        token_amount: 0,
        eth_amount: 0,
    });
    return await _user.save();
}

// 회원정보 수정 : nickname 외 기타 사용자 입력 정보. 현재기준으로는 nickname, password가 있으나, password 변경은 별도로 관리.
userSchema.statics.setUserInfo = async function(user_id, nickname) {
    const _user = {
        nickname: nickname
    };
    return await this.findOneAndUpdate({user_id: user_id}, _user);
}

// 회원정보 수정 : password
userSchema.statics.setPassword = async function(user_id, password) {
    const _hash = bcrypt.hash(password, 10);
    const _password = {
        password: _hash,
    };
    return await this.findOneAndUpdate({user_id: user_id}, _password);
}

// 20 token 변경(user_id)
userSchema.statics.setEthAmountById = async function(user_id, amount) {
    const _userInfo = await this.find({user_id: user_id});
    _userInfo.eth_amount += amount;
    return await this.findOneAndUpdate({user_id: user_id}, _userInfo);
}

// 20 token 변경(nickname)
userSchema.statics.setEthAmountById = async function(nickname, amount) {
    const _userInfo = await this.find({nickname: nickname});
    _userInfo.eth_amount += amount;
    return await this.findOneAndUpdate({nickname: nickname}, _userInfo);
}

// nft token 변경(user_id)
userSchema.statics.setTokenAmountById = async function(user_id, amount) {
    const _userInfo = await this.find({user_id: user_id});
    _userInfo.token_amount += amount;
    return await this.findOneAndUpdate({user_id: user_id}, _userInfo);
}

// nft token 변경(nickname)
userSchema.statics.setEthAmountById = async function(nickname, amount) {
    const _userInfo = await this.find({nickname: nickname});
    _userInfo.token_amount += amount;
    return await this.findOneAndUpdate({nickname: nickname}, _userInfo);
}

// 게시글 등록시 time-lock 설정
userSchema.statics.setWaitingTime = async function(user_id) {
    const _waiting_time = {
        waiting_time: new Date()
    };
    return await this.findOneAndUpdate({user_id: user_id}, _waiting_time);
}

// 비밀번호 일치여부 확인
userSchema.statics.checkPassword = async function(user_id, password) {
    const _hash = bcrypt.hash(password, 10);
    const _userInfo = await this.find({user_id: user_id});
    if(_hash === _userInfo.password){
        return true;
    } else {
        return false;
    }
}

// 회원정보 요청 (user_id)
userSchema.statics.getUserInfoById = async function(user_id) {
    return await this.find({user_id: user_id});
}

// 회원정보 요청 (nickname)
userSchema.statics.getUserInfoByNickname = async function(nickname) {
    return await this.find({nickname: nickname});
}

// 회원정보 요청 (user_address)
userSchema.statics.getUserInfoByAddress = async function(address) {
    return await this.find({address: address});
}

module.exports = mongoose.model('User', userSchema);