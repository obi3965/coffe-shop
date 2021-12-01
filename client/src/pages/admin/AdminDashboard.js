import React from 'react'
import AdminNav from '../../components/adminNav/AdminNav'
import '../../styles/categoryCreate.css'


 const AdminDashboard = () => {
  return(
    <div className="container-fluid">
        
    <div className="row">
   <div className="col-lg-2 col-md-2 col-sm-6 AdminNav">
      <div className="adminNav">
        <AdminNav />  
      </div> 
   </div>
 </div>
</div>
   )

 }

 export default AdminDashboard