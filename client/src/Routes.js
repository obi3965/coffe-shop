import React,{ useEffect} from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Product from './pages/Product';
import Contact from './pages/Contact';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import SignupComplete from './pages/auth/SignupComplete'
import { ProductDetails } from './components/productDetail/ProductDetails';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux'
import firebaseApp from './firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import ForgotPassword from './pages/auth/ForgotPassword';

firebaseApp()

 const Routes = () => {
  const dispatch = useDispatch()

  const auth = getAuth()

   useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, async(user) =>{

   
     if(user){
       const idTokenResult = await user.getIdTokenResult()
       console.log('user', user);
       dispatch({
         type:'LOGGED_IN_USER',
         payload:{
           email:user.email,
           token:idTokenResult.token
         }
       })
     }
     })
    
return () => unsubscribe()
  
  
    
   }, [dispatch,auth]);


    return(
    <>
     <BrowserRouter>
     <Navbar />
     <ToastContainer />
      <Switch>
       <Route path="/" exact component={Home} />
       <Route path="/cart" exact component={Cart} />
       <Route path="/products" exact component={ Product } /> 
       <Route path="/contact" exact component={ Contact } /> 
       <Route path="/signup" exact component={ Signup } /> 
       <Route path="/signup/complete" exact component={ SignupComplete } /> 
       <Route path="/signin" exact component={ Signin } />
       <Route path="/forget/password" exact component={ ForgotPassword } />
       <Route path="/product/:id" exact component={ ProductDetails } />  
      </Switch>
    </BrowserRouter>
    </>
   )

 }

 export default Routes