import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props){
  const [qty , setQty] = useState(1);
  const productDetails= useSelector(state=>state.productDetails);
  const {product, loading, error}=productDetails;
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(detailsProduct(props.match.params.id));
    return ()=>{
    
    }
  },[]);


  const handleAddToCart=()=>{
    props.history.push("/cart/"+ props.match.params.id +"?qty="+qty)
  }




return <div>
  <div className="back-link">
    <Link to="/"><span className="back-link"> Back to home</span></Link>
  </div>
{loading?<div>loading...</div>:
error?<div>{error}</div> :
(

<div className="details">
    <div className="details-image">
      <img src={product.image} alt={product.name}/>
    </div>
    <div className="details-info">
      <ul>
        <li>
         <h4 className="item-name">{product.name}</h4>         
        </li>
        <li>
          <span className="min-detail">{product.mindetails}</span>
        </li>
        <li>
          {product.details}
        </li>
        <li>
         Price : <b>Rs {product.price}</b>
        </li>
      </ul>
    </div>

    <div className="details-action">
      <ul>
        <li>
        <span className="min-detail"> price: Rs {product.price}</span>
        </li>
        <li>
        <span className="min-detail"> Status:  </span>{product.stock>0 ? "In Stock" : "Out of Stock" }
        </li>
        <li>
        <span className="min-detail "> 
        
        Qty: <select value={qty} onChange={(e)=>{setQty(e.target.value)}}>
        
          {[...Array(product.stock).keys()].map(x=>
            <option key={x + 1} value={x + 1}>{x + 1}</option>
          )}
            
          </select>
          </span>
        </li>
        <li>

          {product.stock>0 && <button onClick={handleAddToCart} className="cart-button">Add to Cart</button>}
         
        </li>
      </ul>
    </div>

  </div>



)}


  


    </div>

}

export default ProductScreen;