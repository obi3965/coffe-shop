import React from 'react'
import '../../styles/categoryCreate.css'
import {Link} from 'react-router-dom'


 const AdminNav = () => {
  return(
    <>
    <nav className="nav flex-column">
    <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
       admin dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/product" className="nav-link">
        product
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/products" className="nav-link">
          products
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/category" className="nav-link">
          Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/sub" className="nav-link">
          Sub Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/coupon" className="nav-link">
          Coupon
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Password
        </Link>
      </li>
</nav>
    </>
   )

 }

 export default AdminNav