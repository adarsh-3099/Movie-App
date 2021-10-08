import classnames from 'classnames';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import { loginUser } from '../actions/authAction';

function Register() {

    const auth = useSelector(state => state.auth)
    const errors = useSelector(state => state.errors)
    const { isAuthenticated, user } = auth

    const history = useHistory()

    console.log(auth)

    useEffect(()=>{
        if(errors){
            setErrors(errors)
        }
    },[errors])

    useEffect(()=>{
          if(isAuthenticated){
              history.push('/dashboard')
          }
    },[isAuthenticated])

    const dispatch = useDispatch();

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [Errors,setErrors] = useState({})

    console.log('------------------->>>>>>>>>>>>>>>>>>>>>',Errors)

    const onSubmit = (e) =>{
        e.preventDefault();

        const userData = {
            email: email,
            password: password
        }

        dispatch(loginUser(userData))
    }

    return (
        <div>
            <div className="register">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto"> 
                    <h1 className="display-4 text-center text-white">Sign In</h1>
                    <form onSubmit={onSubmit} className="shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="form-group">                            
                            <input 
                                className={classnames("form-control form-control-lg",{'is-invalid': errors.email})}
                                placeholder="Email Address"
                                name="email"
                                type="email"
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
                         
                        <input type="submit" className="btn btn-success btn-block mt-4 color-red" />
                    </form>
                    </div>
                </div>
                </div>
            </div>

        </div>
    )
}

export default Register
