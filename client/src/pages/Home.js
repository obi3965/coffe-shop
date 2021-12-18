import React, { Fragment, useState} from 'react'
// import { CgMouse } from "react-icons/all";

import HomeBanner from '../components/banner/HomeBanner'
import { MetaData } from '../components/layout/MetaData'
import Loader from '../components/layout/Loader'
import '../styles/feature.css'
//import { getProducts } from '../functions/product'
//import ProductCard from '../components/cards/ProductCard'
//import CategoryCard from '../components/cards/CategoryCard'
//import { getCategories } from '../functions/category'
import ServiceCard from '../components/services/ServiceCard'
import { serviceList } from '../components/services/data'
import { Finest } from '../components/banner/Finest'
import NewArrival from '../components/home/NewArrival'
import BestSeller from '../components/home/BestSeller'

const Home = () => {
  const [loading, setLoading] = useState(false)
  // const [products, setProducts] = useState([])
  //const [categories, setCategories] = useState([])
 

  // useEffect(() => {
  //   loadAllProducts()
  //   //loadAllCategories()
   
  // }, [])

  // const loadAllProducts = () => {
  //   getProducts("createdAt","desc",3).then((res) => {
  //     setLoading(true)
  //     setProducts(res.data)
  //     console.log('all products', res)
  //     setLoading(false)
  //   })
  // }
  
  
  // const loadAllCategories = () => {
  //   getCategories().then((res) => {
  //     setLoading(true)
  //     setCategories(res.data)
  //     console.log('all categories', res)
  //     setLoading(false)
  //   })
  // }

  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="home" />
          <HomeBanner />
          <div className="container">
            <div className="service-title">
              <span>Service Area</span>
              <h1>EXPLORE KOFI SERVICE</h1>
            </div>
            <div className="row">
              {serviceList.map((list) => {
                return (
                <div className="col-lg-4 col-md-4 "key={list.id}>
                  <ServiceCard list={list}  />
                </div>
                )
              })}
             
            </div>
          </div>

          <div>
            <Finest />
          </div>

          {/* <div className="row m-auto">
              {/* <div className="col-lg-3 col-md-3 col-sm-6 box">
                <h3>categories</h3>
                { categories.map((category) => {
                  
                    return<div key={category._id} className="">
                      <CategoryCard category={category} />
                    </div>
                  
                })}
              </div> */}
 
              {/* <div className="col-lg-9 col-md-9">
               

              </div>
            </div>  */}

          <div className="container">
          <h2 className="text-center">new arrival products</h2>
            <NewArrival />
          </div>

          <div className="container">
          <h2 className="text-center">best seller products</h2>
            <BestSeller />
          </div>
        </>
      )}
    </Fragment>
  )
}

export default Home
