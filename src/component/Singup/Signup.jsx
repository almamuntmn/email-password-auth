import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../../firebase-init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';

const Signup = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const terms = form.terms.checked;
        console.log(email, password, terms);

        setError('');
        setSuccess(false);

        if (!terms) {
            setError('Please accept the terms and conditions.');
            return;
        }

        // Password validation
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                // email verification
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    setSuccess(true);
                    alert('Please check your email to verify your account.');
                })
                // // clean form
                // form.reset();
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleLogin} className='space-y-3'>
                            <label className="label">Email</label>
                            <input type="email" className="input" name='email' placeholder="Email" />
                            <label className="label">Password</label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="input"
                                    name='password' placeholder="Password" />
                                <div onClick={() => setShowPassword(!showPassword)} className='absolute top-1/2 right-2 transform -translate-y-1/2'>
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </div>
                            </div>
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <label className="label">
                                <input type="checkbox" name="terms" className="checkbox" />
                                Accept our terms and conditions
                            </label>
                            <br />
                            <input className='btn btn-primary' type="submit" value="Signup" />
                            <br />
                            <p>Already have an account? <Link to='/login' className='link link-hover text-blue-400'>Login</Link></p>
                        </form>
                        {
                            error && <p className='text-red-600'>{error}</p>
                        }
                        {
                            success && <p className='text-green-600'>User created successfully</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;