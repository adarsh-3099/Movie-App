const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateMoviesInput(data){
    let errors = {}

    data.title = !isEmpty(data.title) ? data.title : ""

    if(isEmpty(data.title)){
        errors.title = "Movie Title Cannot Be Empty."
    }

    return { errors, isValid: isEmpty(errors) }
}