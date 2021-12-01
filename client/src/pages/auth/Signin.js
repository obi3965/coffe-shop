import React, { Fragment, useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebaseApp  from "../../firebase";
import {getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import Loader from "../../components/layout/Loader";
import { Link } from 'react-router-dom'
import {createOrUpdateUser} from "../../functions/auth";
firebaseApp()



const Signin = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth()
  let dispatch = useDispatch();
  const { user } = useSelector((state) =>({...state}))

  
  useEffect(() => {
    if(user && user.token) history.push('/')
 }, [user, history]);
  
 const roleBasedRedirect = (res) => {
  if (res.data.role === "admin") {
    history.push("/admin/dashboard");
  } else {
    history.push("/user/history");
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email,password);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
       console.log('login',result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
      .then((res) =>{
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
      roleBasedRedirect(res);
      })
      .catch((err) => console.log(err));

      
      
      
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const provider = new GoogleAuthProvider()

  const googleSignin = async () =>{
    signInWithPopup(auth,provider)
    .then(async (result) => {
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
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
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
      
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.message);
    });
  }

  const signinForm = () => (
    <form>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
      </div>
      <div className="signin-btns d-block">
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={!email || password.length < 6}
        className="btn btn-info btn-lg"
      >
        signin
      </button>
     
              </div>
    </form>
  );

  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 offset-md-3">
              {signinForm()}
              <button
                  type="submit"
                  onClick={googleSignin}
                 
                  className="btn btn-danger btn-lg"
                >
                  signin with google
                </button>
                <Link to="/forget/password">forget password</Link>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default Signin;
