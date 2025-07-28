import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import auth from '../../firebase.config';
import { Link } from 'react-router-dom';
const Register = () => {
    const [register, setRegister] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const handleRegister = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const name = e.target.name.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(email, name, password, terms);
        if (password.length < 6) {
            setError('Password Should Be 6 Character Or longer')
            return
        }
        else if (!terms) {
            setError('Please accept terms and Conditions')
            return
        }
        else if (!/[A-Z]/.test(password)) {
            setError('set password at least a uppercase character')
            return
        }
        setRegister('')
        setError('')
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setRegister('Successfully Register')
                sendEmailVerification(result.user)
                    .then(() => {
                        alert("Please check your email inbox and verify the email")
                    })
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: 'https://lh3.googleusercontent.com/ogw/AF2bZyjhaTnayxY4BURRPybUKw5JDzwOQw4pm7FMztfwKGxIOLlY=s64-c-mo'
                })
                    .then()
            })
            .catch(error => {
                console.error(error.message)
                setError('User already exist')
            })

    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" className="input" name='name' placeholder="Your Name" required />
                                <label className="label">Email</label>
                                <input type="email" className="input" name='email' placeholder="Your Email" required />
                                <label className="label">Password</label>
                                <div className='flex relative'>
                                    <input type={showPassword ? 'text' : 'password'} name='password' className="input" placeholder="Password" required />
                                    <span className='text-2xl absolute right-9 top-3 z-10'
                                        onClick={() => setShowPassword(!showPassword)}>{
                                            showPassword ? <FaEyeSlash /> : <FaEye />
                                        }
                                    </span>
                                </div>
                                <div className='flex gap-2'>
                                    <input type="checkbox" name="terms" id="" /> <span>Accept Terms And Conditions</span>
                                </div>
                                <div>
                                    <p className='text-green-500 text-xl' >{register}</p>
                                    <p className='text-red-500' >{error}</p>
                                </div>
                                <button className="btn btn-neutral mt-4">Register</button>
                                <p>Already Have An Account? Please <Link to={'/login'}>Login</Link></p>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;