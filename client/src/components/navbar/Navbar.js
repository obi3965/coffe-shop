import React,{ Fragment,useState } from 'react'
import { withRouter, NavLink, Link } from "react-router-dom";
import '../../styles/nav.css'

 const Navbar = () => {
     const [ click, setClick ] = useState(false)
    // const handleClick = () => setClick(!click)
     const closeMobileMenu = () => setClick(false)

  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
  <Link className="navbar-brand" to="/">
    <div className="logo"></div>
  </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav m-auto">
            
      <li className="nav-item">
        <NavLink className="nav-link" onClick={closeMobileMenu} to="/">home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" onClick={closeMobileMenu} to="/products">Products</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/cart">cart</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" onClick={closeMobileMenu} to="/contact">contact</NavLink>
      </li>
     
     </ul>
     <div className="navbar-nav ml-auto d-flex">
  <li className="nav-item">
        <NavLink className="nav-link" onClick={closeMobileMenu} to="/signin">signin</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" onClick={closeMobileMenu} to="/signup">signup</NavLink>
      </li>
      </div>
    
  </div>
 </div>
</nav>
  
  </>
   )

 }
 export default withRouter(Navbar)