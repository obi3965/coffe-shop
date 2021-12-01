import React, { Fragment, useState } from "react";
// import { CgMouse } from "react-icons/all";

import HomeBanner from "../components/banner/HomeBanner";
import { MetaData } from "../components/layout/MetaData";
import Loader from "../components/layout/Loader";

import '../styles/feature.css'

const Home = () => {
  const [loading, setLoading] = useState(false);
 
 
  return (
    <Fragment>
     {loading ? <Loader /> : 
     
     <>
     <MetaData title="home" />
           <HomeBanner />

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container">
            <div className="row">
                
              
            </div>
           
          </div>
          </>
        
     }
           
      
    </Fragment>
  );
};

export default Home;
