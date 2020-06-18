
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signin } from '../actions/userAction';

function SignScreen(props){

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const userSignin = useSelector(state=>state.userSignin);
  const { loading , userInfo , error }=userSignin;

  const dispatch = useDispatch();

  const redirect = props.location.search?props.location.search.split("=")[1]:'/';

  useEffect(()=>{
      if(userInfo){
          props.history.push(redirect);
      }
    return ()=>{
    
    }
  },[userInfo]);


 const submitHandler=(e)=>{
     e.preventDefault();
     dispatch(signin(email,password));
 }



return <div className="form">
<form onSubmit={submitHandler}>
    <ul className="form-container">
        <li>
            <h3 className="signin">Sign-In</h3>
        </li>
        <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
        </li>
        <li>
            <label htmlFor="email">
                Email
            </label>
            <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}/>
        </li>
        <li>
            <label htmlFor="password" >password</label>
            <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
        </li>
        <li>
            <button type="submit" className="button11 primary">Signin</button>
        </li>
        <li>
            New to GWDonut?
        </li>
        <li>
        <button type="submit" className="button11 primary"> <Link to={redirect ==="/"?"register":"register?redirect="+redirect} className="bottom">
            Create your account 
            </Link></button>
        </li>

    </ul>
</form>
</div>

}

export default SignScreen;