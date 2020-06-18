
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { register } from '../actions/userAction';

function RegisterScreen(props){

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [repassword,setrePassword]=useState('')
  const [name,setName]=useState('')
  const userRegister = useSelector(state=>state.userSignin);
  const { loading , userInfo , error }=userRegister;

  const dispatch = useDispatch();
  const redirect = props.location.search?props.location.search.split("=")[1]:'/';

  useEffect(()=>{
      if(userInfo){
          props.history.push(redirect)
      }
    return ()=>{
    
    }
  },[userInfo]);


 const submitHandler=(e)=>{
     e.preventDefault();
     dispatch(register(name,email,password,repassword));
 }



return <div className="form">
<form onSubmit={submitHandler}>
    <ul className="form-container-signup">
        <li>
            <h3 className="signup">Create Account</h3>
        </li>
        <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
        </li>
        <li>
            <label htmlFor="name">
                Name
            </label>
            <input type="name" name="name" id="name" onChange={(e)=>setName(e.target.value)}/>
        </li>
        <li>
            <label htmlFor="email">
                Email
            </label>
            <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}/>
        </li>
        <li>
            <label htmlFor="password">
                password
            </label>
            <input type="password" name="password" id="passwaord" onChange={(e)=>setPassword(e.target.value)}/>
        </li>
        <li>
            <label htmlFor="repassword" >Re-password</label>
            <input type="password" name="password" id="password" onChange={(e)=>setrePassword(e.target.value)}/>
        </li>
        <li>
            <button type="submit" className="button11 primary">    <Link to={redirect ==="/"?"sigin":"sigin?redirect="+redirect} className="bottom">
            Sign-Up
            </Link></button>
        </li>
        <li>
            Already have an account?
        </li>
        <li>

{/* 
        <Link to={redirect ==="/"?"sigin":"sigin?redirect="+redirect} className="bottom">
            Sign-In 
            </Link> */}

        <Link to="/signin" className="bottomsignup">  Sign-In </Link>
        </li>

    </ul>
</form>
</div>

}

export default RegisterScreen;