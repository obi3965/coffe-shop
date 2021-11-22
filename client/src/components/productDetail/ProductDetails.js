import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import { ReviewCard } from "../review/ReviewCard";
import ReactStars from "react-rating-stars-component";
import { clearError } from "../../actions/productAction";

export const ProductDetails = ({ match }) => {
  const [quantity, setQuantity] = useState(1);


  const alert = useAlert();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
//   const { success, error: reviewError } = useSelector(
//     (state) => state.newReview
//   );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {
    if (error) {
        alert.error(error);
        dispatch(clearError());
      }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, error, match.params.id, alert]);

  const decreaseQuantity = () => {
     if(product.Stock <= quantity) return
     const qty = quantity + 1;
     setQuantity(qty)
  }

  const increaseQuantity = () => {
      if(1 >= quantity) return;
      const qty = quantity - 1;
      setQuantity(qty)
}
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                <div className="p-details-img">
                  {product.images &&
                    product.images.map((item, i) => (
                      <img key={item.url} src={item.url} alt={i} />
                    ))}
                </div>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-6 col-xs-12">
                <div className="p-details-btns">
                  <div>
                    <h2>{product.name}</h2>
                     <ReactStars {...options} />
                      <span>{" "} 
                      ({product.numOfReview} Reviews)</span>
                  </div>
                  <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  <p>
                    Status:{" "}
                    <b
                      className={product.Stock < 1 ? "redColor" : "greenColor"}
                    >
                      {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>
                <button className="submitReview">
                Submit Review
              </button>
              </div>
            </div>
          </div>
          <div className="container">
              <div className="row">
                  <div className="col-lg-6 col-md-6 offset-md-3">
                      <div className="p-details-dec">
                          <p>description: {product.description}</p>
                      </div>
                  </div>
              </div>
          </div>
          
        </Fragment>
      )}
      {product.reviews && product.reviews[0] ? ((review) => {
          <div className="review">
            {product.reviews && product.reviews.map((review) =>{
                <ReviewCard key={review._id} review={review} />
            })}
          </div>
      }):(
          <p></p>
      )}
    </Fragment>
  );
};
