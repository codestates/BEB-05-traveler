const mongoose = require('mongoose');

// 최초 접속 시 클라이언트에 n개의 게시물 정보 전송
const quantity = 4;

const postSchema = new mongoose.Schema({
    post_id : {
        type: Number,
        required: true,
        unique: true
    },
    user_id : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    image : {
        data : Buffer,
        contentType: String
    },
    place_name : String,
    place_address : String,
    reward : Number,
    created_at : {
        type : Date,
        default : Date.now
    }
})

// 게시글 저장
postSchema.statics.savePost = async function(obj, idx) {
    const _post = new this({
        post_id: idx,
        user_id: obj.user_id,
        title: obj.title,
        content: obj.content,
        image: obj.image,
        place_name: obj.place_name,
        place_address: obj.place_address,
        reward: obj.reward,
    });
    return await _post.save();
}

// 모든 게시글 조회
postSchema.statics.getAllPosts = async function() {
    return await this.find({});
}

// 총 게시글 번호 조회
postSchema.statics.getPostId = async function() {
    return await this.find({}).sort({post_id : -1}).limit(1);
}

// 게시글 번호로 조회
postSchema.statics.getPostByNumber = async function(post_id) {
    return await this.find({post_id: post_id});
}

// 사용자 id로 모든 게시글 조회
postSchema.statics.getPostByUserId = async function(user_id) {
    return await this.find({user_id: user_id});
}

// 게시글 수정
postSchema.statics.setPost = async function(obj) {
    const _post = {
        post_id: obj.post_id,
        user_id: obj.user_id,
        title: obj.title,
        content: obj.content,
        image: obj.image,
        place_name: obj.place_name,
        place_address: obj.place_address,
    }
    return await this.findOneAndUpdate({post_id: obj.post_id}, _post);
}

// 게시글 삭제
postSchema.statics.removePost = async function(post_id) {
    return await this.deleteOne({post_id: post_id});
}

// 최신 게시물 n개 조회
postSchema.statics.getRecentPost = async function() {
    return await this.find({}).sort({created_at : -1}).limit(quantity);
}


module.exports = mongoose.model("Post", postSchema);