import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "../../styles/product.css";


export const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "#fff",
    activeColor: "#d3ad7f",
    size: 24,
    isHalf: true,
    value: product.ratings,
  };
  return (
    <>
    
      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <div className="products">
          <Link to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt="" />
            <h1>{product.name}</h1>
            <h1>{`$${product.price}`}</h1>
            <ReactStars {...options} />
            <span>{product.numOfReviews} reviews</span>
          </Link>
        </div>
      </div>
    </>
  );
};
