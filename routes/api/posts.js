const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const passport  = require('passport')

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')


const validatePostInput = require('../../validation/post')

router.get('/test',(req,res)=>{
    res.json("It's Working.")
})

router.get('/:movie_id',(req,res)=>{
    Post.findOne({ movieId: req.params.movie_id })
    .then((post)=>res.json(post))
    .catch((err)=>res.json(err))
})

router.post('/:movie_id',(req,res)=>{

    const errors = {}

    Post.findOne({ movieId: req.params.movie_id })
    .then((post) =>{
        if(post){
            errors.movie = "Movie Already Exists."
            res.status(404).json(errors)
        }else{
            const newMovie = new Post({
                movieId: req.params.movie_id
            })
        
            newMovie.save()
            .then((p) => res.json(p))
            .catch((err) => console.log(err))              
        }
    })
})

router.post('/review/:movie_id',passport.authenticate('jwt',{ session: false }),(req,res) =>{

    if (!req.body) {
        return res.status(400).json({
          status: 'error',
          error: 'req body cannot be empty',
        });
      }

    console.log(req.body)

    const { errors, isValid } = validatePostInput(req.body)

    if(!isValid){
        console.log('Not valid')
        return res.status(400).json(errors)
    }

    Post.findOne({ movieId: req.params.movie_id })
    .then((post) =>{
        const newReview = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        }

        // console.log(post)
        // console.log(newReview)
        // add to comments
        post.review.unshift(newReview)

        post.save().then(post => res.json(post))
        .catch(err => res.json(err))

    })
    .catch(err => res.status(404).json(err))
})

module.exports = router;