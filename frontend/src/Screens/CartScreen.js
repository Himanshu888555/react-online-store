import React, { useEffect } from 'react';
import {Link} from "react-router-dom"
import {addToCart, removeFromCart} from '../actions/cartAction';
import {useDispatch, useSelector} from 'react-redux';

function CartScreen(props){

    const cart=useSelector(state=>state.cart);

    const{cartItems}=cart;


    const removeFromCartHandler = (productId)=>{
        dispatch(removeFromCart(productId));
    }

    const checkOutHandler=()=>{
        props.history.push("/signin?redirect=shipping");
    }


    const productId=props.match.params.id;
    const qty=props.location.search?Number(props.location.search.split("=")[1]):1;

    const dispatch=useDispatch();


    useEffect(()=>{
    if(productId){
        dispatch(addToCart(productId,qty));
    }
        },[])


    return   <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3 className="title-cart">
                        Shopping Cart
                    </h3>
                    <div>
                        Price
                    </div>
                </li>
                {
                    cartItems ===0 ? <div>Cart is empty</div>:
                    cartItems.map(item=>
                        <div className="cart-image">
                            <img className="image-cart" src={item.image} alt={item.name}/>
                            <div className="cart-name">
                                <Link to={"/product/"+item.product}>
                            <div className="text-img">
                                    
                                    {item.name}

                                </div>
                                </Link>
                                <div>
                                    Qty:
                                    <select  class="selectopt" value={item.qty} onChange={(e)=>dispatch=>(item.product,e.target.value)}>
                                    {[...Array(item.stock).keys()].map(x=>
                                           <option key={x + 1} value={x + 1}>{x+1}</option>
                                      )}
                                    </select>
                                    <button type="button" className="buttondel" onClick={()=>removeFromCartHandler(item.product)} > Delete</button>
                                </div>
                            </div>

                            <div className="item-price">
                                price : Rs   {item.price} / piece
                            </div>
                        </div>
                        )
                }

            </ul>

        </div>
        <div className="cart-action">
            <h3>
                SubTotal({cartItems.reduce((a,c)=>a+c.qty,0)}items)
            :
            Rs {cartItems.reduce((a,c)=>a+c.price*c.qty,0)}
            </h3>

            <button onClick={checkOutHandler} className="button primary" disabled={cartItems.length===0}>Order</button>

        </div>
        
        </div>
    
}

export default CartScreen;