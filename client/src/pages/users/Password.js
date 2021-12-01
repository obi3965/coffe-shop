import React,{Fragment, useState} from 'react'
import { HistoryBanner } from '../../components/banner/HistoryBanner'
import { SideNav } from '../../components/userSideNav/SideNav'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { getAuth,updatePassword } from 'firebase/auth'
import firebaseApp from '../../firebase'
import {useSelector } from 'react-redux';
//import Loader from '../../components/layout/Loader'
import { currentUser } from '../../functions/auth';
firebaseApp()


const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth()
  const { user } = useSelector((state) =>({...state}))
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
     console.log(password);

   await currentUser(user)
      updatePassword(user,auth,password) 
      .then(res => {
        setLoading(false);
        // console.log(res, 'password update')
        setPassword("");
        toast.success("Password updated");
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter new password"
          disabled={loading}
          value={password}
        />
        <button
          className="btn btn-primary"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <>
    <HistoryBanner />
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <SideNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Password Update</h4>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
    </>
  );
};


  export default Password