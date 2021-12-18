import React, {Fragment, useEffect, useState} from 'react'
import ProductBanner from '../components/banner/ProductBanner'

import { getProductsByCount } from '../functions/product'
import Loader from '../components/layout/Loader'
import ProductsCard from '../components/cards/ProductsCard'



export const Products = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
       loadAllProducts()
    }, []);
   
  const loadAllProducts = () =>{
    setLoading(true)
    getProductsByCount(20)
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
  return(
    <div>
        {loading ? (
            <Loader />
        ):(
            <Fragment>
    <ProductBanner/>
    <h1>our products collection</h1>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore blanditiis accusamus fuga omnis deserunt velit aperiam nisi obcaecati laboriosam vel.</p>
    <div className="container">
      <div className="row">
          {products.map((productsList) => {
             return<div className="col-md-4">
                    <ProductsCard productsList={productsList} />
              </div>
          })}
      </div>
    </div>
    </Fragment>
        )}
          
           
          </div>
   )

 }