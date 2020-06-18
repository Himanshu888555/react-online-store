import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {  listProducts } from '../actions/productActions';

function HomeScreen (props){


  const productList = useSelector(state=>state.productList);
  const {products,loading,error}=productList;
 const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(listProducts());
    
    
    return()=>{

    };
  },[])



return (

  loading ? <div> loading... </div>:
  error ? <div>{error}</div> :

    <ul className="products-lists">

    {
      products.map(product=> 
        <li key={product._id}>
          <div className="product">
          <Link to={'/product/'+ product._id}>  <img className="product-image" src={product.image} alt="product" /> </Link>
             
              <div className="product-info">
                  <div className="product-name"><Link to={'/product/'+ product._id}> {product.name} </Link> {product.demand} </div>
                  <div className="product-details"> {product.mindetails}</div>
                  <div className="product-price">price: Rs {product.price}</div>
                  <div className="quantity">{product.quantity}({product.weight})</div>
              </div>
          </div>
      </li>  
       
       )
       
      }           
        
      <div className="border"></div>
  </ul>

);

}

export default HomeScreen;