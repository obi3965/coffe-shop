import React from 'react'
import ReactStars from "react-rating-stars-component";
import img from '../../img/Profile.png'
export const ReviewCard = ({review}) => {
    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
        size: 24,
      };

  return(
    <div className="reviewCard">
         <img src={img} alt="User" />
         <p>{review.name}</p>
        <ReactStars {...options} />
        <span className="reviewCardComment">{review.comment}</span>
        
    </div>
   )

 }