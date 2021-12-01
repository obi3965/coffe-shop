import React,{ useEffect, useState} from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { currentAdmin } from "../../functions/auth";



const AdminRoute = ({children, ...rest}) => {
  const {user }= useSelector((state) => ({...state}))
  const [ok, setOk] = useState(false);

useEffect(() => {
   if(user && user.token){
       currentAdmin(user.token)
       .then(res =>{
        console.log(res, 'admin')
        setOk(true)
       }).catch(err =>{
         console.log(err, 'admin Route error')
         setOk(false)
       })
   }
}, [user]);
   return ok ? (
   <Route {...rest} />
   ) : (
       <Loader />
   )   
    
   
    }
export default AdminRoute;
