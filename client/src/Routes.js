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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux'
import firebaseApp from './firebase';
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import ForgotPassword from './pages/auth/ForgotPassword';
import { currentUser } from './functions/auth';
import UserRoute from './components/routes/UserRoute';
import History from './pages/users/History';
import { Wishlist } from './pages/users/Wishlist';
import  Password  from './pages/users/Password';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import { CategoryUpdate } from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import CreateProduct from './pages/admin/product/CreateProduct';
import AllProducts from './pages/admin/product/AllProducts';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import { Products } from './pages/Products';


firebaseApp()

 const Routes = () => {
  const dispatch = useDispatch()

  const auth = getAuth()

   useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, async(user) =>{

   
     if(user){
       const idTokenResult = await user.getIdTokenResult()
       console.log('user', user);
       currentUser(idTokenResult.token)
       .then((res) => {
         dispatch({
           type: "LOGGED_IN_USER",
           payload: {
             name: res.data.name,
             email: res.data.email,
             token: idTokenResult.token,
             role: res.data.role,
             _id: res.data._id,
           },
         });
       })
       .catch((err) => console.log(err));
     }
     })
    
return () => unsubscribe()
  
  
    
   }, [dispatch, auth]);


    return(
    <>
     <BrowserRouter>
     <Navbar />
     <ToastContainer />
      <Switch>
       <Route path="/" exact component={Home} />
       <Route path="/cart" exact component={Cart} />
       <Route path="/products" exact component={ Products } /> 
       <Route path="/contact" exact component={ Contact } /> 
       <Route path="/signup" exact component={ Signup } /> 
       <Route path="/signup/complete" exact component={ SignupComplete } /> 
       <Route path="/signin" exact component={ Signin } />
       <Route path="/forget/password" exact component={ ForgotPassword } />
       <UserRoute exact path="/user/history" component={History} />
       <UserRoute exact path="/user/wishlist" component={Wishlist} />
       <UserRoute exact path="/user/password" component={Password} />
       <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
       <AdminRoute exact path="/admin/category" component={CategoryCreate} />
       <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
       <AdminRoute exact path="/admin/sub" component={ SubCreate } />
       <AdminRoute exact path="/admin/sub/:slug" component={ SubUpdate } />
       <AdminRoute exact path="/admin/product" component={ CreateProduct } />
       <AdminRoute exact path="/admin/products" component={ AllProducts } />
       <AdminRoute exact path="/admin/product/:slug" component={ ProductUpdate } />
       <Route exact path="/product/:slug" component={Product} />
       
      </Switch>
    </BrowserRouter>
    
    </>
   )

 }

 export default Routes