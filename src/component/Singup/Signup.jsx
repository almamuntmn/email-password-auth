import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../../firebase-init';

const Signup = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState('');

const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    setError('');
    setSuccess(false);

    createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
        const user = result.user;
        console.log(user);
        setSuccess(true); 
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
                            <input type="password" className="input" name='password' placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <input className='btn btn-primary' type="submit" value="Login" />
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