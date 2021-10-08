const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const PostSchema = new Schema({
    movieId: {
        type: String,
    },
    review: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: "users"
            },
            text: {
                type: String,
                required: true 
            },      
            name: {
                type: String,
            },
            avatar: {
                type: String 
            },
            date: {
                type: Date,
                default: Date.now 
            }
        }
    ],
    likes: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ]
})

module.exports = Post = mongoose.model('post',PostSchema)