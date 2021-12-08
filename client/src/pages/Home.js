import React, { Fragment, useState, useEffect } from "react";
// import { CgMouse } from "react-icons/all";

import HomeBanner from "../components/banner/HomeBanner";
import { MetaData } from "../components/layout/MetaData";
import Loader from "../components/layout/Loader";

import '../styles/feature.css'
import { getProductsByCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import CategoryCard from "../components/cards/CategoryCard";
import { getCategories } from "../functions/category";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);


 useEffect(() => {
   loadAllProducts()
   loadAllCategories()
 }, [])


 const loadAllProducts = () => {
  getProductsByCount(2)
  .then((res) => {
    setLoading(true)
     setProducts(res.data)
    console.log("all products", res)
    setLoading(false)
  })
 }


 const loadAllCategories = () => {
  getCategories()
  .then((res) => {
    setLoading(true)
     setCategories(res.data)
    console.log("all categories", res)
    setLoading(false)
  })
 }

  return (
    <Fragment>
     {loading ? <Loader /> : 
     
     <>
     <MetaData title="home" />
           <HomeBanner />

          <h2 className="homeHeading">Featured Products</h2>
           <div className="container">
             <div className="row m-auto">
               
             {categories.map((category) => {
                  return <div key={category._id} className="col-md-3 bg-info text-center ">
                   <CategoryCard category={category}/>
                  </div>
                  
                })}
             </div>
             
           </div>
          <div className="container">
            <div className="row">
                {products.map((product) => {
                  return <div key={product._id} className="col-md-4">
                   <ProductCard product={product}/>
                  </div>
                  
                })}

                {/* {JSON.stringify(products)} */}
              
            </div>
           
          </div>
          </>
        
     }
           
      
    </Fragment>
  );
};

export default Home;
