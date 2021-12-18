import React from 'react'
import { Link } from 'react-router-dom'


 const ProductsCard = ({productsList}) => {
    const { title, images, price, slug } = productsList
  return(
    <div>
  <div className="product-card-box">
      <img 
        src={
          images && images.length ? images[0].url : ""
        }
        className="card-img-top"
      />
      <div className="product-card-items">
        <h3 className="card-title">{title}</h3>
        <span>{`$ ${price}`}</span>
      </div>
      <div className="product-btn">
          <Link to={`/product/${slug}`} className="btn btn-danger btn-sm">view</Link>
          <Link className="btn btn-success btn-sm" to="">buy</Link>
      </div>
    </div>
    </div>
   )

 }
 export default ProductsCard