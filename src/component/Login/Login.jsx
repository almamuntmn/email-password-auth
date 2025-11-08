import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router';
import { auth } from '../../../firebase-init';

const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const emailRef = useRef(null);

    // Handle login logic here
const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    setError('');
    setSuccess(false);


    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
        const user = result.user;
        console.log(user);
        if (!user.emailVerified) {
            setError('Your email is not verified. Please verify your email first.');
        }
        else {
            setSuccess(true);
        }
    })
    .catch(error => {
        console.error(error);
        setError(error.message);
    })
}

const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log(emailRef.current.value);
    const email = emailRef.current.value;

    setError('');

    sendPasswordResetEmail(auth, email)
    .then(() => {
        alert('Password reset email sent');
    })
    .catch(error => {
        console.error(error);
        setError(error.message);
    })

}


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-3xl font-bold my-4 text-center">Login now!</h1>
                <div className="card card-body">
                    <form onSubmit={handleLogin} className='space-y-2'>
                        <label className="label">Email</label>
                        <input type="email" className="input" name='email' placeholder="Email" ref={emailRef} required/>
                        <label className="label">Password</label>
                        <input type="password" className="input" name='password' placeholder="Password" required autoComplete='password'/>
                        <div onClick={handleForgotPassword}><a className="link link-hover">Forgot password?</a></div>
                        <br />
                        <input className='btn btn-primary' type="submit" value="Login" />
                        <p>Don't have an account? <Link className='link link-hover text-blue-500' to='/signup'>Register</Link></p>
                        {error && <p className='text-red-500'>{error}</p>}
                        {success && <p className='text-green-500'>Login successful!</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;