import React from 'react'
import { HistoryBanner } from '../../components/banner/HistoryBanner'
import { SideNav } from '../../components/userSideNav/SideNav'

export const Wishlist = (props) => {
  return(
    <>
    <HistoryBanner />
  <div className="container-fluid">
      
     <div className="row">
    <div className="col-md-2">
       <div className="sideNav">
         <SideNav />  
       </div>
      
        
    </div>
    <div className="col-lg-10 col-md-10">
        <h1>wishlist</h1>
    </div>
  </div>
</div>
</>
   )

 }