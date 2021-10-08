const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateUserInput(data){
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.password2 = !isEmpty(data.password2) ? data.password2 : ""

    if(!Validator.isLength(data.name, { min: 4, max: 30 })){
        errors.name = "Name should be of length between 4-30."
    }
    
    if(Validator.isEmpty(data.name)){
        errors.name = "Name field is required."
    }
    
    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required."
    }
    
    if(!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)){
        errors.email = "Email is invalid."
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required."
    }
    
    if(!Validator.isEmpty(data.password) && !Validator.isLength(data.password,{ min: 6, max: 20 })){
        errors.password = "Password should be of length 6-20."
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Password field is required."
    }
    
    if(!Validator.isEmail(data.password2) && !Validator.equals(data.password,data.password2)){
        errors.password2 = "Passwords don't match."
    }

    return { errors, isValid: isEmpty(errors) }
}