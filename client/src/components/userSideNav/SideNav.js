import React from 'react'
import '../../styles/sidenav.css'
import {Link} from 'react-router-dom'


export const SideNav = () => {
  return(
    <>
    <nav className="nav flex-column">
    <li className="nav-item">
        <Link to="/user/history" className="nav-link">
        <i className="fas fa-history"></i> History
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
        <i className="fas fa-key"></i> Password
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/wishlist" className="nav-link">
          <i className="fas fa-heart"></i> Wishlist
        </Link>
      </li>
</nav>
    </>
   )

 }