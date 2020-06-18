
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { saveShipping } from '../actions/cartAction';
import CheckoutSteps from '../components/checkoutstep';

function ShippingScreen(props){

  const [address,setAddress]=useState('')
  const [city,setCity]=useState('')
  const [postalcode,setPostalCode]=useState('')
  const [country,setCountry]=useState('')
 

  const dispatch = useDispatch();


 const submitHandler=(e)=>{
     e.preventDefault();
     dispatch(saveShipping({address,city,postalcode,country}));
     props.history.push('payment')
 }



return <div>
    <CheckoutSteps step1 step2 ></CheckoutSteps>

  
<div className="form">
<form onSubmit={submitHandler}>
    <ul className="form-container-signup">
        <li>
            <h3 className="signup">Shipping</h3>
        </li>
       
        <li>
            <label htmlFor="address">
                Address
            </label>
            <input type="address" name="address" id="address" onChange={(e)=>setAddress(e.target.value)}/>
        </li>
        <li>
            <label htmlFor="city">
                City
            </label>
            <input type="city" name="city" id="city" onChange={(e)=>setCity(e.target.value)}/>
        </li>
        <li>
            <label htmlFor="address">
                Postal Code
            </label>
            <input type="postalcode" name="postalcode" id="postalcode" onChange={(e)=>setPostalCode(e.target.value)}/>
        </li>

        <li>
            <label htmlFor="counrty">
            Country
            </label>
            <input type="country" name="country" id="country" onChange={(e)=>setCountry(e.target.value)}/>
        </li>
        
        <li>
            <button type="submit" className="button11 primary">Continue</button>
        </li>
    

    </ul>
</form>
</div>
</div>



}

export default ShippingScreen;