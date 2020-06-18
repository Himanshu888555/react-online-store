import React, { useEffect } from 'react';
import {Link} from "react-router-dom"
import {addToCart, removeFromCart} from '../actions/cartAction';
import {useDispatch, useSelector} from 'react-redux';
import CheckoutSteps from '../components/checkoutstep';
import { createOrder } from '../actions/orderActions';

function PlaceOrderScreen(props){

    const cart=useSelector(state=>state.cart);
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
  
    const{cartItems,shipping,payment}=cart; 
    if(!shipping.address){
        props.history.push("/shipping");
    }else if(!payment.paymentMethod){
        props.history.push("/payment");
    }

    const itemsPrice =cartItems.reduce((a,c)=>a+c.price*c.qty,0);
    const shippingPrice = itemsPrice<100?0:10;
    const taxPrice = 0.10*itemsPrice;
    const totalPrice = itemsPrice+shippingPrice+taxPrice;


    // const removeFromCartHandler = (productId)=>{
    //     dispatch(removeFromCart(productId));
    // }

    
    const dispatch=useDispatch();

        const checkOutHandler=()=>{
            props.history.push("/signin?redirect=shipping");
        }

        const placeOrderHandler=()=>{
            dispatch(createOrder({
                orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
                taxPrice, totalPrice
              }));
        }


        useEffect(() => {
            if (success) {
              props.history.push("/order/" + order._id);
            }
        
          }, [success]);


    return  <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

        <div className="placeorder">
        <div className="placeorder-info">
            <div className="ship">
                <h3 className="text-ship">
                    shipping
                </h3>
                <div>
                    {cart.shipping.address},
                    {cart.shipping.city},
                    {cart.shipping.postalCode},
                    {cart.shipping.country},
                </div>
                <div>
                    <h3>
                        payment
                    </h3>
                    <div>
                        Payment Method : {cart.payment.paymentMethod}
                    </div>
                </div>
                <div>

                <ul className="placeorder-list-container">
                <li>
                    <h3 className="title-cart11">
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
                                    Qty:{item.qty}
                                   
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
            </div>
           

        </div>
        <div className="placeorder-action11">
            <ul>
                <li>
                    <button className="button primary" disabled={cartItems.length===0} onClick={placeOrderHandler}>
                        Place Order
                    </button>
                </li>
                <li>
                    <h3>Order Summary</h3>
                </li>
                <li>
                    <div>Items</div>
                    <div>Rs {itemsPrice}</div>
                </li>
                <li>
                    <div>Shipping</div>
                    <div>Rs {shippingPrice}</div>
                </li>
                <li>
                    <div>Tax</div>
                    <div>Rs {taxPrice}</div>
                </li>
                <li>
                    <div>Order Total</div>
                    <div>Rs {totalPrice}</div>
                </li>

            </ul>

            {/* <button onClick={checkOutHandler} className="button primary" disabled={cartItems.length===0}>Order</button> */}

        </div>
        
        </div>


    </div>
    
    
    
  
    
}

export default PlaceOrderScreen;