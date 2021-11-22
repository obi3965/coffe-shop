import React, { Fragment, useEffect } from "react";
// import { CgMouse } from "react-icons/all";
import { getProduct } from "../actions/productAction";
import HomeBanner from "../components/banner/HomeBanner";
import { MetaData } from "../components/layout/MetaData";
import { Product } from "../components/productDetail/Product";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/layout/Loader";
import {useAlert} from 'react-alert'
import '../styles/feature.css'

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if(error){
      return alert.error(error)
    }
    dispatch(getProduct());
  }, [dispatch, error]);
 
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
           <MetaData title="home" />
           <HomeBanner />

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container">
            <div className="row">
                 {products &&
                  products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
              
            </div>
           
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
