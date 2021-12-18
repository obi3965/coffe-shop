import React from 'react'
import banner_1 from '../../img/banner1.png'
import "../../styles/finest.css"

export const Finest = (props) => {
  return(
    <div  className="container mt-4 finest-box">
        <div className="row m-auto">
<div className="col-lg-6 col-md-6">
<div className="image">
    <img src={banner_1} alt="" />
</div>
</div>
<div className="col-lg-6 col-md-6">
    <div className="items">
        <h1>FINEST INGREDIENTS
</h1>
  <p>This is the perfect place to find a nice and cozy spot to sip some. You'll find the Java Jungle, Coffee Bean and more.</p>
    </div>
    <ul className="finest-items">
        <span className="title">Coffeemaker</span>
        <li> 
             Receive incoming calls or speed dial contacts
           without reaching aniesn.
           </li>
           <span className="title">Coffee Grinder</span>
           <li> Calls and Calendar management personal contacts
             without reaching edfes.
             </li>
           <span className="title">Coffee Cups</span>
          <li>
           Controls management personal contacts without
           reaching phones wfers.
          </li>
    </ul>
</div>
        </div>
    
    </div>
   )

 }