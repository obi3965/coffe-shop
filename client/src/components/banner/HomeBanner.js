import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/homebanner.css'
import TypeWriter from '../cards/TypeWriter'

 const HomeBanner = (props) => {
  return(
    <div className="homeBanner">
       <div className="content-box">
         
         <h1>
         <TypeWriter text={["Enjoy Your Coffee And","Buy The Coffee Machine"]} />
       </h1>
       <p className="animated">Experience the decibels like your ears deserve to. Safe for
       <br />
       the ears, very for the heart. A treat to your ears.</p>
         <Link to="/products" className="btn btn-default btn-lg">
        explore more
      </Link> 
      </div>
    </div>
   )
 
 }
 export default HomeBanner