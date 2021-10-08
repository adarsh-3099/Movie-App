const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle:{
        type: String,
        required: true
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true 
    },
    movies: [
        {
            title: {
                type: String,
                required: true
            },
            url: {
                type: String
            }
        }
    ],
    bio: {
        type: String 
    },
    artists: {
        type: [String], // array of strings
        required: true
    },
    social: {
        youtube: {
            type: String,
        },
        
        facebook: {
            type: String,
        },

        instagram: {
            type: String,
        },
        
        letterboxd: {
            type: String,
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile',ProfileSchema)