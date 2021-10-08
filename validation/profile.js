const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateProfileInput(data){
    let errors = {}
    
    data.handle = !isEmpty(data.handle) ? data.handle : ""
    data.status = !isEmpty(data.status) ? data.status : ""
    data.artists = !isEmpty(data.artists) ? data.artists : ""

    if(!Validator.isLength(data.handle,{ min: 4, max: 10 })){
        errors.handle = "Handle should be of length 4-10."
    }

    if(Validator.isEmpty(data.handle)){
        errors.handle = "Handle is Required."
    }

    if(!Validator.isLength(data.status,{ min: 6, max: 50 })){
        errors.status = "Status should be of length 6-50."
    }

    if(Validator.isEmpty(data.status)){
        errors.status = "Status is Required."
    }

    if( Validator.isEmpty(data.artists)){
        errors.skiils = 'Artists Field is Required'
    }

    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.youtube = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.twitter = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
            errors.facebook = 'Not a valid URL'
        }
    }
    
    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)){
            errors.instagram = 'Not a valid URL'
        }
    }

    if(!isEmpty(data.letterboxd)){
        if(!Validator.isURL(data.letterboxd)){
            errors.letterboxd = 'Not a valid URL'
        }
    }
    
    return { errors, isValid: isEmpty(errors) };

}