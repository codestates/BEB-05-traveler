const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    user_id : {
        type : String,
        unique : true
    },
    nickname : String,
    password : {
        type : String
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

userSchema.statics.findUserid = function(user_id) {
    return this.findOne({'user_id' : user_id}).exec();
}
userSchema.methods.setPassword = function (password) {
    const hash = bcrypt.hash(password, 10);
    this.password = hash;
}
userSchema.methods.checkPassword = function (user_id, password) {
    const hash = bcrypt.hash(password, 10);
    const userInfo = this.findOne(user_id);
    if (hash === userInfo.password) {
        return true;
    }
    else {
        return false;
    }
} 


module.exports = mongoose.model('User', userSchema);