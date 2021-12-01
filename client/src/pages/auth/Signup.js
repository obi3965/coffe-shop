import React, { useState } from 'react'

import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import  firebaseApp  from '../../firebase'
import { sendSignInLinkToEmail, getAuth } from 'firebase/auth'

firebaseApp()

 const Signup = () => {
   const [email, setEmail ] = useState("")
  
  const auth = getAuth()
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const actionCodeSettings  = {
        url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
      };
  
     await sendSignInLinkToEmail(auth,email, actionCodeSettings );
   
    
      toast.success(
        `Email is sent to ${email}. Click the link to complete your registration.`
      );
      // save user email in local storage
      window.localStorage.setItem("emailForRegistration", email);
      // clear state
      setEmail("");
    } catch (error) {
      console.log(error.message);
    }
    
  };

   const signupForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
     
      <button type="submit" className="btn btn-danger">
        Register
      </button>
    </form>
    
  );
  return(
    <>
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 offset-md-3">
          
         {signupForm()}
        </div>
      </div>
    </div>
   
    
    </>
   )

 }
 export default Signup