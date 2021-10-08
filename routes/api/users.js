const express = require('express')
const router = express.Router()
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const gravatar = require('gravatar')

// Load User Model
const User = require('../../models/User')

const validateUserInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// @route GET api/posts/users
// @desc Tests post route
// @access Public (As some routes need to be protected)
// Each routes will have these

router.get('/test',(req,res)=>{
    res.send('This is Test')
})

// @route GET api/posts/users
// @desc Tests post route
// @access Public (As some routes need to be protected)
// Each routes will have these

router.post('/register',(req,res)=>{
    const { errors, isValid } = validateUserInput(req.body)

    if(!isValid){
        res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email })
    .then((user) =>{
        if(user){
            errors.email = "Email Already Exists"
            res.status(404).json(errors)
        }else{
            const avatar = gravatar.url(req.body.email,{
                s: '200', //size
                r: 'pg' , //rating,
                d: 'mm' //default
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
            })

            bycrypt.genSalt(10, (err,salt)=>{
                bycrypt.hash(newUser.password, salt, (err,hash)=>{
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                    .then((user) => res.json(user))
                    .catch((err) => console.log(err))
                }) 
            })
        }
    })
})

// @route GET api/posts/users
// @desc Tests post route
// @access Public (As some routes need to be protected)
// Each routes will have these
// Login Route

router.post('/login',(req,res) =>{
    const { errors, isValid } = validateLoginInput(req.body)
    if(!isValid){
        res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email })
    .then((user) => {
        if(!user){
            errors.email = "User Not Found."
            res.status(404).json(errors)
        }
        bycrypt.compare(password,user.password)
        .then((isMatch) =>{
            if(isMatch){
                
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                } // to create jwt payload

                // sign token
                jwt.sign(payload,keys.secretOrKey,{ expiresIn: 7200 },(err,token)=>{
                    res.json({
                        success: true,
                        token: "Bearer "+token
                    })
                })

            }else{
                errors.password = "Wrong Password."
                res.status(404).json(errors)
            }
        })
    })
})


router.get('/current',passport.authenticate('jwt',{ session: false }),(req,res)=>{
    res.json({
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
    })
})

module.exports = router