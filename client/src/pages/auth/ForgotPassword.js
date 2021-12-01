import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebaseApp  from "../../firebase";
import {getAuth,sendPasswordResetEmail} from "firebase/auth";
import Loader from "../../components/layout/Loader";
// import { clearError } from "../../actions/productAction";


firebaseApp()



 const ForgotPassword = ({history}) => {
     const [email, setEmail] = useState('');
     const [loading, setLoading] = useState(false);
     const auth = getAuth()
     const { user } = useSelector((state) =>({...state}))

     useEffect(() => {
        if(user && user.token) history.push('/')
     }, [user, history]);
     
     const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);

       const actionCodeSettings ={
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
        handleCodeInApp: true,
        };
        await sendPasswordResetEmail(auth,email, actionCodeSettings)
        .then(() =>{
            setEmail('')
            setLoading(false)
            toast.success("Check your email for password reset link");
        })
        .catch((error) => {
            setLoading(false);
            toast.error(error.message);
            console.log("ERROR MSG IN FORGOT PASSWORD", error.message);
          });
     }

  return(
    <>
    {loading ? (
        <Loader/>
    ):(
     <div className="container">
        <div className="row">
            <div className="col-lg-6 col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email"
          autoFocus
        />
        <br />
        <button className="btn btn-raised" disabled={!email}>
          Submit
        </button>
      </form>
            </div>
        </div>
    </div>
    )}
    
    </>
   )

 }
 export default ForgotPassword