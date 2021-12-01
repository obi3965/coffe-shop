import React from 'react'
import { HistoryBanner } from '../../components/banner/HistoryBanner'
import { SideNav } from '../../components/userSideNav/SideNav'
import '../../styles/sidenav.css'


 const History = () => {
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
    </div>
  </div>
  </>
   )

 }
 export default History