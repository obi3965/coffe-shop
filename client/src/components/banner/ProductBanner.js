import React from 'react'
import '../../styles/productbanner.css'
import {Link} from 'react-router-dom'


 const ProductBanner = () => {
  return(
    <div className="productBanner">
        <div className="productBanner-box">
         <h1>enjoy your coffee and</h1>
         <h1>buy the coffee machine </h1>
         <Link to="/products" className="btn btn-default btn-lg">
        get it now
      </Link> 
      </div>
    </div>
   )

 }
 export default ProductBanner