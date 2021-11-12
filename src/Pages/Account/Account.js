import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import './Account.css';

const Account = () => {
    
    const { registerNewUser, loginEmailPass, googleLogin, error, setError } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);


    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/';


    const getName = (event) => {
        setName(event.target.value);
    }

    const getEmail = (event) => {
        setEmail(event.target.value);
    }

    const getPass = (event) => {
        setPassword(event.target.value);
    }

    const getPass2 = (event) => {
        if (password === event.target.value) {
            setPassword(event.target.value);
            setError('');
        }
        else {
            setError('Password did not match...!');
        }
    }


    const handleRegister = () => {
        if (password.length < 6) {
            setError("Password Must Be 6 Character long");
            return;
        }
        registerNewUser(email, password, name)
            .then(() => {
                setRegister(false);
                alert('Register Successful...!');
            });
    }

    const handleLogin = () => {
        loginEmailPass(email, password)
            .then((result) => {
                if (result?.user) {
                    history.push(redirect_uri);
                }
            });
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                history.push(redirect_uri);
            });
    }

    const toggleLogin = () => {
        register ? setRegister(false) : setRegister(true);
    }

    return (
        <div className="page account text-center">
            <div className="account-page p-4 p-lg-5">
                <h2>{register ? 'Join Now' : 'Welcome Back'}</h2>

                <div className="account-form">
                    <form onSubmit={(e) => { e.preventDefault(); register ? handleRegister() : handleLogin() }} className="text-start px-lg-3 mt-4 text-center">
                        {
                            register &&
                            <div className="mb-3 text-start">
                                <label htmlFor="fName" className="form-label">Full Name</label>
                                <input onBlur={getName} type="text" className="form-control" aria-label="Full name" required />
                            </div>
                        }
                        <div className="mb-2 text-start">
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input onChange={getEmail} type="email" className="form-control" id="inputEmail4" required />
                        </div>
                        <div className="text-start">
                            <label htmlFor="inputPassword4" className="form-label">Password</label>
                            <input onChange={getPass} type="password" className="form-control" id="inputPassword4" required />
                        </div>
                        {
                            register &&
                            <div className="mt-2 text-start">
                                <label htmlFor="inputPassword4" className="form-label">Confirm Password</label>
                                <input onChange={getPass2} type="password" className="form-control" id="inputPassword4" required />
                            </div>
                        }
                        <p className="mt-3 text-danger">{error}</p>
                        <button type="submit" className="btn btn-primary"><i className="fas fa-sign-in-alt"></i> &nbsp;{register ? 'Register' : 'Login'}</button>
                    </form>
                    {
                        !register &&
                        <>
                            <p className="my-2">OR</p>
                            <button onClick={handleGoogleLogin} className="btn btn-regular"><i className="fab fa-google"></i>&nbsp; Login With Google</button>
                        </>
                    }
                    <hr />
                    {
                        register ?
                            <>
                                <p>Already Registered?</p>
                                <button onClick={toggleLogin} className="btn btn-regular">Login Now</button>
                            </> :
                            <>
                                <p>Don't Have an Account Yet?</p>
                                <button onClick={toggleLogin} className="btn btn-regular">Join Now</button>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Account;