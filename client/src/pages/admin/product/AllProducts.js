import React,{useEffect, useState} from 'react'
import { getProductsByCount, removeProduct } from '../../../functions/product';
import '../../../styles/categoryCreate.css'
import Loader from "../../../components/layout/Loader";
import AdminProductCard from '../../../components/cards/AdminProductCard';
import AdminNav from '../../../components/adminNav/AdminNav';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

 const AllProducts= () => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);
   const { user }  = useSelector((state) => ({...state}));


  useEffect(() => {
   loadAllProducts()
  }, []);



  const loadAllProducts = () =>{
     setLoading(true)
     getProductsByCount(100)
     .then((res) =>{
       console.log("pro", res)
       setProducts(res.data)
       setLoading(false)
     })
     .catch((err) => {
      setLoading(false);
      console.log(err);
    });
  }

  const handleRemove = (slug) => {
    let answer = window.confirm('Delete')
    if(answer){
        removeProduct(slug, user.token)
        .then((res) =>{
           console.log("deleted", res)
           loadAllProducts()
           toast.error(`${res.data.title} is deleted`);
        }).catch((err) => {
            if (err.response.status === 400) toast.error(err.response.data);
            console.log(err)
        })
    }
  }

  return(
    <div className="container-fluid">
        
    <div className="row">
   <div className="col-lg-2 col-md-3 col-sm-6 AdminNav">
      <div className="adminNav">
        <AdminNav />  
      </div> 
   </div>
   <div className="col-lg-10 col-md-9 col-sm-6 col-xs-12">
     {loading ? (
       <Loader />
     ):(
      <h4>All Products</h4>
     )}
     <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <AdminProductCard  product={product} handleRemove={handleRemove}  />
                 
              </div>
            ))}
          </div>
   </div>
 </div>
</div>
   )

 }

 export default AllProducts