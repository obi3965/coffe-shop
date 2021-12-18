import React, { Fragment, useEffect, useState } from "react";
import ProductBanner from '../components/banner/ProductBanner'
import SingleProduct from "../components/cards/SingleProduct";
import Loader from "../components/layout/Loader";
import { getProduct } from "../functions/product";



const Product = ({match}) => {
  const [product, setProduct] = useState({});
  const [ loading, setLoading ] = useState(false)

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () => {
     setLoading(true)
    getProduct(slug).then((res) => {
      setProduct(res.data)
      setLoading(false)
    }).catch((err) => {
      setLoading(false);
      console.log(err);
    });
  }
    
  return(
    <div>
      
      {loading ?  (
        
     
         <Loader />
         
        ):( 
        <Fragment>
        <ProductBanner/>
           <SingleProduct product={product}/>
          </Fragment> 
        )}
     
    </div>
   )

 }
 export default Product