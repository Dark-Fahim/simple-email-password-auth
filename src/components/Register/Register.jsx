import React, { useState } from 'react';
import {  createUserWithEmailAndPassword } from "firebase/auth"
import auth from '../../firebase.config';
const Register = () => {
    const [register, setRegister] = useState('')
    const [error, setError] = useState('')
    const handleRegister = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const name = e.target.name.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        console.log(email, name, password, terms);
        setRegister('')
        setError('')
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);
            setRegister('Successfully Register')
        })
        .catch(error => {
            console.error(error.message)
            setError(error.message)
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
                                <input type="text" className="input" name='name' placeholder="Your Name" required/>
                                <label className="label">Email</label>
                                <input type="email" className="input" name='email' placeholder="Your Email" required/>
                                <label className="label">Password</label>
                                <input type="password" name='password' className="input" placeholder="Password" required/>
                                <div className='flex gap-2'>
                                    <input type="checkbox" name="terms" id="" required/> <span>Accept Terms And Conditions</span>
                                </div>
                                <div>
                                    <p className='text-green-500 text-2xl' >{register}</p>
                                    <p className='text-red-500 text-2xl' >{error}</p>
                                </div>
                                <button className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;