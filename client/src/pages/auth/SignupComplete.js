import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import firebaseApp from '../../firebase'
import { signInWithEmailLink, updatePassword, getIdTokenResult, getAuth } from 'firebase/auth'
import {createOrUpdateUser} from '../../functions/auth';

firebaseApp()

 const SignupComplete = ({history}) => {
   const [email, setEmail ] = useState("")
   const [password, setPassword ] = useState("")
  
   const auth = getAuth()
   let dispatch = useDispatch()
   const { user } = useSelector((state) =>({...state}))

    useEffect(() => {
       setEmail(window.localStorage.getItem('emailForRegistration'))
       //console.log(window.location.href);
       //console.log(window.localStorage.getItem('emailForRegistration'));
    }, [user]);
   const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password){
        toast.error('Email & password is required')
        return
    }
    if(password.length < 6){
        toast.error("Password must be at least 6 characters long")
        return
    }
    try {
        
      const result = await signInWithEmailLink(auth,email,window.location.href)
      if(result.user.emailVerified){
          window.localStorage.removeItem("emailForRegistration")
          let user = auth.currentUser
          await updatePassword(user,password)
          const idTokenResult = await getIdTokenResult(user)
          console.log("user", user, "idTokenResult", idTokenResult);
        
          createOrUpdateUser(idTokenResult.token)
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

        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
    
  };

   const completeSignupForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        autoFocus
        disabled
      />

<input
        type="password"
        className="form-control"
        value={password} onChange={e => setPassword(e.target.value)}
        autoFocus
        placeholder="password"
      />
     
      <button type="submit" className="btn btn-danger">
       complete Registeration
      </button>
    </form>
    
  );
  return(
    <>
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 offset-md-3">
         <h1>complete register</h1> 
         {completeSignupForm()}
        </div>
      </div>
    </div>
   
    
    </>
   )

 }
 export default SignupComplete