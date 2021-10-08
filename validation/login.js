const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateLoginInput(data){

    let errors = {}

    data.email = (!isEmpty(data.email)) ? data.email : ""
    data.password = (!isEmpty(data.password)) ? data.password : ""

    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required."
    }

    if(!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)){
        errors.email = "Email is Invalid."
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required."
    }

    if(!Validator.isEmpty(data.password) && !Validator.isLength(data.password,{ min: 6, max: 20 })){
        errors.password = "Password should be of length 6-20."
    }

    return { errors, isValid: isEmpty(errors) }

}