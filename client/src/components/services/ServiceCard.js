import React from 'react'
import '../services/service.css'

 const ServiceCard = ({list}) => {
     const {name, image, text} = list
  return(
    <div className="service-card">
        <img src={image} alt="" />
        <div className="service-item">
        <h1>{name}</h1>
        <p>{text}</p>
        </div>
    </div>
   )

 }
 export default ServiceCard