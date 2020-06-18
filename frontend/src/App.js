import React from 'react';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import ProductsScreen from './Screens/ProductsScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SignIn';
import RegisterScreen from './Screens/Register';
import { useSelector } from 'react-redux';
import ShippingScreen from './Screens/shippingScreen';
import PaymentScreen from './Screens/paymentScreen';
import PlaceOrderScreen from './Screens/placeorderScreen';
import OrderScreen from './Screens/OrderScreen';
import ProfileScreen from './Screens/ProfileScreen';
import OrdersScreen from './Screens/OrdersScreen';


function App() {

  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} =userSignin
 
  return (

    <BrowserRouter>
   
 <div className="grid-container">
   <link href="https://fonts.googleapis.com/css2?family=Roboto:ital@1&family=Suez+One&display=swap" rel="stylesheet"></link>
 <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@700&family=Roboto:ital@1&family=Suez+One&display=swap" rel="stylesheet"></link>

    <header className="header">
     
      <div className="brands">
        <Link to="/">GW Donut</Link>    
      </div>
      <div>
        <Link to="/cart/" className="header-element">Cart</Link>
        {
          userInfo ? <Link className="profile-name header-element" to="/profile">{userInfo.name}</Link>:

        <Link to="/signin" className="header-element">Sigin</Link>
        }
        {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#"  >Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
      </div>  

    </header>

    <main className="main">

        <div className="container">


        <Route path="/orders" component={OrdersScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/order/:id" component={OrderScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/products" component={ProductsScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" exact={true} component={HomeScreen} />
          
           
          
        </div>

    </main>

    <footer className="footer"> All rights reserved </footer>

</div>

</BrowserRouter>

  );
}

export default App;
