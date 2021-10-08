const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Profile Model
const Profile = require('../../models/Profile')

// Load User Model
const User = require('../../models/User')

const validateProfileInput = require('../../validation/profile')
const validateMoviesInput = require('../../validation/movies')

// @route GET api/users/test
// @desc Tests post route
// @access Public (As some routes need to be protected)
// Each routes will have these

router.get('/test',(req,res)=>{
    res.json({
        "Profile": "Adarsh"
    })
})

// @route GET api/users/test
// @desc Tests post route
// @access Public (As some routes need to be protected)
// Each routes will have these

router.get('/',passport.authenticate('jwt',{ session: false }),(req,res)=>{
    const errors = {}
    console.log(req.user.id)
    Profile.findOne({ user: req.user.id })
    .populate('user',['name', 'avatar'])
    .then((profile) =>{
        if(!profile){
            errors.noProfile = "User has no Profile Yet."
            res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch((err) => res.status(404).json(err))
})

// @route GET api/users/profile/all
// @desc Get all profile
// @access Public (As some routes need to be protected)

router.get('/handle/:handle',passport.authenticate('jwt',{ session: false }),(req,res)=>{
    const errors = {}

    Profile.find({ handle: req.params.handle })
    .populate('user',['name', 'avatar'])
    .then((profile)=>{
        if(!profile){
            errors.noProfile = "No Profile associated with the user."
            res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch((err)=>res.status(404).json(err))
})

router.post('/',passport.authenticate('jwt',{ session: false }),(req,res)=>{

    const { errors, isValid } = validateProfileInput(req.body)

    if(!isValid){
        return res.status(404).json(errors)
    }

    const profileFields = {}
    profileFields.user = req.user.id
    if(req.body.handle) profileFields.handle = req.body.handle
    if(req.body.location) profileFields.location = req.body.location
    if(req.body.bio) profileFields.bio = req.body.bio
    if(req.body.status) profileFields.status = req.body.status
    
    if(typeof req.body.artists !== "undefined"){
        profileFields.artists = req.body.artists.split(",")
    }

    profileFields.social = {}

    if(req.body.youtube) profileFields.social.youtube = req.body.youtube
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram
    if(req.body.letterboxd) profileFields.social.letterboxd = req.body.letterboxd

    Profile.findOne({ user: req.user.id })
    .then((profile)=>{
        if(profile){
            // Update
            Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
            .then((profile) => res.json(profile))
        }else{
            Profile.findOne({ handle: req.body.handle })
            .then((profile)=>{
              if(profile){
                  errors.handle = "Handle Already Exists."
                  res.status(404).json(errors)
              }else{
                  new Profile(profileFields).save()
                  .then((profile)=>res.json(profile))
              }  
            })
        }
    })

})

// @route POST api/users/profile/movies
// @desc Add exp. for the user
// @access Private (As some routes need to be protected)

router.post('/movies',passport.authenticate('jwt',{ session: false }),(req,res)=>{
    const { errors, isValid } = validateMoviesInput(req.body)

    if(!isValid){
        res.status(404).json(errors)
    }

    Profile.findOne({ user: req.user.id })
    .then((profile)=>{
        const newMovie = {
            title: req.body.title
        }

        profile.movies.unshift(newMovie)

        profile.save()
        .then((profile)=>res.json(profile))
    })
    .catch((err)=>console.log(err))
})

// @route POST api/users/profile/movies/:movie_id
// @desc Delete movies for the user
// @access Private (As some routes need to be protected)

router.delete('/movies/:movie_id',passport.authenticate('jwt',{ session: false }),(req,res)=>{

    Profile.findOne({ user: req.user.id })
    .then((profile)=>{
        // Get remove idx
        const remove_idx = profile.movies.map(item => item.id)
        .indexOf(req.params.movie_id)

        console.log(remove_idx)
        profile.movies.splice(remove_idx,1)

        profile.save()
        .then((profile)=>res.json(profile))
    })
    .catch((err)=>res.json(err))
})

// @route POST api/users/profile/
// @desc Delete user and profile
// @access Private (As some routes need to be protected)

router.delete('/',passport.authenticate('jwt',{ session: false }),(req,res)=>{
    Profile.findOne({ user: req.user.id })
    .then(()=>{
        User.findOneAndRemove({ _id: req.user.id })
        .then((result) => res.json({ success: 'User deleted' }))
    })
})

module.exports = router