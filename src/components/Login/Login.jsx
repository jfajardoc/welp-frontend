import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {login, signup} from '../../redux';
import { useHistory } from "react-router-dom";
import ValidationMessage from './ValidationMessage';
import Footer from '../Footer/Footer';
import './login.scss';

function Login({login, signup}) {

    const history = useHistory();

    const [state, setState] = useState({
        isRegister: false,
    });
    
    const [loginState, setLoginState] = useState({
        username: '',
        password: '',
        loginError: false
    });

    const [signupState, setSignupState] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        signupError: false,
        nameValid: false,
        usernameValid: false,
        emailValid: false,
        passwordValid: false,
        passwordConfirmValid: false,
        formValid: false,
        errorMsg: {}
    });

    useEffect(()=>{
        validateForm();
        // eslint-disable-next-line
    },[signupState.username, signupState.name, signupState.email, signupState.password, signupState.passwordConfirm]);

    const handleChange = (event) => {
        setLoginState({
            ...loginState,
            [event.target.name]: event.target.value
        })
    }

    const handleLoginError = () => {
        setState({
            ...loginState,
            loginError: true
        });
    }

    const clearLoginError = () => {
        setState({
            ...loginState,
            loginError: false
        });
    }

    const updateUsername = (username) => {
        setSignupState({...state, username: username});
        validateUsername(username);
    }

    const updateName = (name) => {
        setSignupState(state => ({...state, name: name}));
        validateName(name);
        validateForm();
    }

    const updateEmail = (email) => {
        setSignupState(state => ({...state, email: email}));
        validateEmail(email);
        validateForm();
    }

    const updatePassword = (password) => {
        setSignupState(state => ({...state, password: password}));
        validatePassword(password);
        validateForm();
    }

    const updatePasswordConfirm = (passwordConfirm) => {
        setSignupState(state => ({...state, passwordConfirm: passwordConfirm}));
        validatePasswordConfirm(passwordConfirm);
        validateForm();
    }

    const validateUsername = (username) => {
        let usernameValid = true;
        let errorMsg = {...signupState.errorMsg};

        if(username.length < 3) {
            usernameValid = false;
            errorMsg.username = "Must be at least 3 characters long."
        }

        if(username.length >= 3) {
            usernameValid = true;
            errorMsg.username = ''
        }

        setSignupState(state =>({
            ...state,
            usernameValid: usernameValid,
            errorMsg: errorMsg
        }));
    }

    const validateName = (name) => {
        let nameValid = true;
        let errorMsg = {...signupState.errorMsg};

        if(name.length < 3) {
            nameValid = false;
            errorMsg.name = "Must be at least 3 characters long."
        }

        if(name.length >= 3) {
            nameValid = true;
            errorMsg.name = ''
        }

        setSignupState(state =>({
            ...state,
            nameValid: nameValid,
            errorMsg: errorMsg
        }));
    }

    const validateEmail = (email) => {
        let emailValid = true;
        let errorMsg = {...signupState.errorMsg};
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!emailRegex.test(email)) {
            emailValid = false;
            errorMsg.email = 'Invalid email';
        }

        if(emailRegex.test(email)) {
            emailValid = true;
            errorMsg.email = '';
        }

        setSignupState(state => ({
            ...state,
            emailValid: emailValid,
            errorMsg: errorMsg
        }));
    }

    const validatePassword = (password) => {
        let passwordValid = true;
        let errorMsg = {...signupState.errorMsg};
        const passwordRegex = /[!@#$%^&*]/;

        if(password.length < 6) {
            passwordValid = false;
            errorMsg.password = 'Password must be 6 characters';
        }

        if(!/\d/.test(password)) {
            passwordValid = false;
            errorMsg.password = 'Password must contain a digit';
        }
        
        if(!passwordRegex.test(password)){
            passwordValid = false;
            errorMsg.password = 'Password must contain special character: !@#$%^&*';
        }
        
        if(password.length > 5 && /\d/.test(password) && passwordRegex.test(password)) {
            passwordValid = true;
            errorMsg.password = '';
        }

        setSignupState(state => ({
            ...state,
            passwordValid: passwordValid,
            errorMsg: errorMsg
        }));
    }

    const validatePasswordConfirm = (passwordConfirm) => {
        const {password} = signupState;
        let passwordConfirmValid = true;
        let errorMsg = {...signupState.errorMsg}

        if(passwordConfirm !== password) {
            passwordConfirmValid = false;
            errorMsg.passwordConfirm = "Passwords don't match";
        }
        
        if(passwordConfirm === password) {
            passwordConfirmValid = true;
            errorMsg.passwordConfirm = '';
        }

        setSignupState(state => ({
            ...state,
            passwordConfirmValid: passwordConfirmValid,
            errorMsg: errorMsg
        }));
    }

    const validateForm = () => {
        const {usernameValid, nameValid, emailValid, passwordValid, passwordConfirmValid} = signupState;

        if(!usernameValid || !nameValid || !emailValid || !passwordValid || !passwordConfirmValid) {
            setSignupState(state =>({
                ...state,
                formValid: false
            }));
        }

        if(usernameValid && nameValid && emailValid && passwordValid && passwordConfirmValid) {
            setSignupState(state =>({
                ...state,
                formValid: true
            }));
        }
    }

    const handleLogin = event => {
        event.preventDefault();
        login(loginState.username, loginState.password)
        .then(response => {
            if(response.status === 422) {
                handleLoginError();
            } else if(response.status === 200) {
                history.push('/home');
            }            
        });
    }
 
    const handleSignUp = event => {
        event.preventDefault();
        signup(signupState.name, signupState.username, signupState.email, signupState.password)
        .then(response => {
            if(response.status === 422) {
                setState({
                    ...signupState,
                    signupError: true
                });
            } else if(response.status === 200) {
                history.push('/home');
            }
        })
    }

    const handleClick = event => {
        event.preventDefault();
        setState({
            ...state,
            isRegister: !state.isRegister
        })
    }
    
    return (
        <>
        <div className="backdrop">
            <div className={state.isRegister ? "form-container form-container-bigger" : "form-container"}>
                <img src="/welp-logo.png" alt="logo" className="logo"/>
                <form className={state.isRegister ? "login-form hide": "login-form fade-in"} onSubmit={handleLogin}>
                    <div className={loginState.loginError ? "user-error" : "hide" }>Wrong username or password.</div>
                    <input type="text" placeholder="username" name="username" onChange={handleChange} onFocus={clearLoginError} />
                    <input type="password" placeholder="password" name="password" onChange={handleChange} onFocus={clearLoginError} />
                    <button className="form-button">Log in!</button>
                    <p className="message">Need an account? <button onClick={handleClick} className="form-switcher">Sign up!</button></p>
                </form>
                <form className={state.isRegister ? "signup-form fade-in": "signup-form hide"} onSubmit={handleSignUp}>
                    <div className={signupState.signupError ? "user-error" : "hide" }>Username has already been taken</div>
                    <ValidationMessage valid={state.usernameValid} message={signupState.errorMsg.username} />
                    <input type="text" placeholder="Username" name="username" onChange={(e)=>updateUsername(e.target.value)}/>
                    <ValidationMessage valid={state.nameValid} message={signupState.errorMsg.name} />
                    <input type="text" placeholder="Name" name="name" onChange={(e)=>updateName(e.target.value)}/>
                    <ValidationMessage valid={state.emailValid} message={signupState.errorMsg.email} />
                    <input type="text" placeholder="Email" name="email" onChange={(e)=>updateEmail(e.target.value)}/>
                    <ValidationMessage valid={state.paswwordValid} message={signupState.errorMsg.password} />
                    <input type="password" placeholder="Password" name="password" onChange={(e)=>updatePassword(e.target.value)}/>
                    <ValidationMessage valid={state.paswwordConfirmValid} message={signupState.errorMsg.passwordConfirm} />
                    <input type="password" placeholder="Confirm password" name="passwordConfirm" onChange={(e)=>updatePasswordConfirm(e.target.value)}/>
                    <button disabled={!signupState.formValid} className={signupState.formValid ? "form-button" : "form-button-disabled" }>Sign up!</button>
                    <p className="message">Have an account? <button onClick={handleClick} className="form-switcher">Log in!</button></p>
                </form>
            </div>
        </div>    
        <Footer />
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(login(username, password)),
        signup: (name, username, email, password) => dispatch(signup(name, username, email, password))
    }
}

export default connect(null, mapDispatchToProps)(Login);