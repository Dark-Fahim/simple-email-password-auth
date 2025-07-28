import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../firebase.config';
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
    const [login, setLogin] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [userName, setUserName] = useState('')
    const [profile, setProfile] = useState('')
    const emailRef = useRef(null)
    

    const handleLogin = e => {
        // console.log(emailRef.current.value);
        e.preventDefault()
        console.log('form submitted');
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        setError('')
        setLogin('')

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                if(!result.user.emailVerified){
                    setError("Please verify your email first")
                    alert("Please verify your email first")
                    return
                }
                console.log(result.user);
                setUserName(result.user.displayName)
                setProfile(result.user.photoURL)
                setLogin('login successful')
            })
            .catch(error => {
                setError((error.message+ ' ' + 'Please check you email and password again'))
            })

    }



    const handleResetPassword = () => {
        const email = emailRef.current.value
        console.log(email);
        setError('')
        setLogin('')
        if(!email){
            setError('Please Write your email first')
            return
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setError('Please Write a valid email')
            return
        }
        sendPasswordResetEmail(auth, email)
        .then(result => {
            setLogin('Password Reset email sent')
        })
        .catch(error => {
            console.log(error.message);
        })
    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-bold">{userName ? userName : "Login Now !!"}</h1>
                    {
                        profile && <img src={profile}/>
                    }
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input ref={emailRef} type="email" className="input" name='email' placeholder="Your Email" required />
                                <label className="label">Password</label>
                                <div className='flex relative'>
                                    <input type={showPassword ? 'text' : 'password'} name='password' className="input" placeholder="Password" required />
                                    <span className='text-2xl absolute right-9 top-3 z-10'
                                        onClick={() => setShowPassword(!showPassword)}>{
                                            showPassword ? <FaEyeSlash /> : <FaEye />
                                        }
                                    </span>
                                </div>
                                <div><a className="link link-hover" onClick={handleResetPassword}>Forgot password?</a></div>
                                <div>
                                    <p className='text-green-500 text-xl' >{login}</p>
                                    <p className='text-red-500' >{error}</p>
                                </div>
                                <button className="btn btn-neutral mt-4">Login</button>
                                <p>New to this site? Please <Link to={'/register'}>Register</Link> first</p>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;