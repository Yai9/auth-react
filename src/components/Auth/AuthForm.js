import { useState, useEffect, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || '');


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
console.log(isLogin,'isLogin')
	const emailRef = useRef();
	const passwordRef = useRef();

	const submitFormHandler = (event) => {
		event.preventDefault();

		if(isLogin){
		
		fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBoq61qcPURvq_1AEwRYJv15BthXrj8hlA',{
			method:"POST",
			body: JSON.stringify({email: emailRef.current.value, password: passwordRef.current.value, returnSecureToken:true}),
			headers:{
				"Content-Type":"application/json"
			}
		}).then(res=>{
			if(res.ok){
				return res.json().then(data=>{
					localStorage.setItem('token', data.idToken)
				})
			} else{
				return res.json().then(data=>{
					console.log(data,'data')
				})
			}
		}).catch(err=>{
			console.log(err)
		})

		}
		else{
	

		fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBoq61qcPURvq_1AEwRYJv15BthXrj8hlA',{
			method:"POST",
			body: JSON.stringify({email: emailRef.current.value, password: passwordRef.current.value, returnSecureToken:true}),
			headers:{
				"Content-Type":"application/json"
			}
		}).then(res=>{
			if(res.ok){
				console.log(res,'res')
				return res.json();
			} else{
				return res.json().then(data=>{
					console.log(data,'data')
				})
			}
			console.log(res,'res')
		}).catch(err=>{
			console.log(err)
		})
			
	}
	}
	


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
