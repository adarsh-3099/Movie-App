const path = require('path')
const express = require('express')
const app = express()

const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const passport = require('passport')


const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

// body parser middleware
// now we can user req.body.whatever
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const db = require('./config/keys').mongoURI
const User = require('./models/User')
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((res) => console.log("Mongo DB Connected"))
.catch((err) => console.log(err))

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport)


app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>')
})


// Routes
app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',posts)

// server static assets if in production
if(process.env.NODE_ENV === "production"){
    // set static folder
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port,() => console.log(`App running on ${port}`))

