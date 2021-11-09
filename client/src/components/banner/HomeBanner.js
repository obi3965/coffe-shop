import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/homebanner.css'

 const HomeBanner = (props) => {
  return(
    <div className="homeBanner">
       <div className="content-box">
         <h1>enjoy your coffee and</h1>
         <h1>buy the coffee machine </h1>
         <Link to="/products" className="btn btn-default btn-lg">
        get it now
      </Link> 
      </div>
    </div>
   )
 
 }
 export default HomeBanner