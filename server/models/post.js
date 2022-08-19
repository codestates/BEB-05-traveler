const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user_id : String,
    title : String,
    content : String,
    image : String,
    place_name : String,
    place_address : String,
    reward : Number,
    created_at : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Post", postSchema);