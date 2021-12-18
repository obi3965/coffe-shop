
import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../../components/layout/Loader'
import { getProducts, getProductsCount } from '../../functions/product'
import ProductCard from '../../components/cards/ProductCard'
import { Pagination } from 'antd';

const BestSeller = () => {

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  //const [categories, setCategories] = useState([])
  const [productsCount, setProductsCount ] = useState(0)
  const [page, setPage ] = useState(1)
 

  useEffect(() => {
    loadAllProducts()
    //loadAllCategories()
    getAllProductsByCount()
  }, [page])

  const loadAllProducts = () => {
    getProducts("sold","desc",page).then((res) => {
      setLoading(true)
      setProducts(res.data)
      console.log('sell products', res)
      setLoading(false)
    })
  }
  
  const getAllProductsByCount = () => {
    getProductsCount().then((res) => {
        setLoading(true)
               setProductsCount(res.data)
               console.log("paginate", res)
               setLoading(false)
          })
}
  
  return(
    <>
    
    <div className="row">
                {
                products.map((product) => {
                  
                   return <div key={product._id} className="col-md-4">
                      <ProductCard product={product} />
                     
                    </div>
                 
                })}
                </div>
                <div className="row">
            <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    
    </>
   )

 }
 export default BestSeller 