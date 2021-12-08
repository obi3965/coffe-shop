import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    const { images, title, description } = product
  return (
    <>
    <div className="product-card-box">
      <img 
        src={
          images && images.length ? images[0].url : ""
        }
        className="card-img-top"
      />
      <div className="product-card-items">
        <h3 className="card-title text-white">{title}</h3>
        <p className="card-text text-white">{description}</p>
      </div>
      <div className="crud">
          <button className="btn btn-danger">Delete</button>
          <Link className="btn btn-success" to={`/admin/product/`}>Edit</Link>
      </div>
    </div>
    </>
)
  
} 



export default ProductCard;
