import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Product from './pages/Product';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Signin from './pages/Signin';


 const Routes = () => {
  
    return(
    <>
     <BrowserRouter>
     <Navbar />
      <Switch>
       <Route path="/" exact component={Home} />
       <Route path="/cart" exact component={Cart} />
       <Route path="/products" exact component={ Product } /> 
       <Route path="/contact" exact component={ Contact } /> 
       <Route path="/signup" exact component={ Signup } /> 
       <Route path="/signin" exact component={ Signin } /> 
      </Switch>
    </BrowserRouter>
    </>
   )

 }

 export default Routes