import React, { useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router'
import { connect, useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../actions/authAction'
import classnames from 'classnames'
import axios from 'axios'

function Register() {

    const history = useHistory();    
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(auth.isAuthenticated){
            history.push('/login')
        }
    },[])

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [password2,setPassword2] = useState("")
    const [errors,setErrors] = useState({})

    const onSubmit = (e) =>{
        e.preventDefault();
        const newUser = {
            name: name,
            email: email,
            password: password,
            password2: password2
        }
        console.log(newUser)

        //registerUser(newUser)
        axios.post('/api/users/register',newUser)
        .then(result => {
            console.log(result)
            history.push('/login')})
        .catch(err => {
            console.log(err)
            setErrors(err.response.data)
        }
        )
    }



    return (
        <div>
            <div className="register ">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto"> 
                    <h1 className="display-4 text-center text-white">Sign Up</h1>
                    <p className="lead text-center text-white">Create your Movie App Account and start reviewing</p>
                    <form onSubmit={onSubmit} className="shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="form-group">
                            <input 
                                className={classnames("form-control form-control-lg",{'is-invalid': errors.name})}
                                placeholder="Name"
                                name="name"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                error={errors.name}
                            />
                            { errors.name && (<div className="invalid-feedback">{errors.name}</ div>) }
                        </div>
                        <div className="form-group">                            
                            <input 
                                className={classnames("form-control form-control-lg",{'is-invalid': errors.email})}
                                placeholder="Email Address"
                                name="email"
                                type="email"
                                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                error={errors.email}
                            />
                            { errors.email && (<div className="invalid-feedback">{errors.email}</ div>) }
                        </div>
                        <div className="form-group">
                            <input 
                                className={classnames("form-control form-control-lg",{'is-invalid': errors.password})}
                                placeholder="Password"
                                name="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                error={errors.password}
                            />
                            { errors.password && (<div className="invalid-feedback">{errors.password}</ div>) }
                        </div>
                        <div className="form-group">
                            <input 
                                className={classnames("form-control form-control-lg",{'is-invalid': errors.password2})}
                                placeholder="Confirm Password"
                                name="password2"
                                type="password"
                                onChange={(e) => setPassword2(e.target.value)}
                                value={password2}
                                error={errors.password2}
                            />
                            { errors.password2 && (<div className="invalid-feedback">{errors.password2}</ div>) }
                        </div> 
                        <input type="submit" className="btn btn-success btn-block mt-4" />
                    </form>
                    </div>
                </div>
                </div>
            </div>

        </div>
    )
}

// this comes from reducers/index
const mapStateToProps = (state) =>({
    auth: state.auth,
    errors: state.errors,
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));