import React from 'react'
import { Link } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import '../../styles/carousel.css'


 const SingleProduct = ({product}) => {
     const { title, images, description } = product
     

  return(
    <>
    
<div className="container">
        <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                <Carousel onClickItem={true} Arrows={false}>
                    {images && images.map((i) => {
                        return(
                        
                         <img src={i.url} key={i.public_id} alt="" />
                    
                    )
                    })}
                
                </Carousel>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-6 col-xs-12">
                <div className="s-product-box">
                   <h3>{title}</h3>
                 <p>{description}</p>
                  <div className="add-to-cart">
                      <Link className="btn btn-outline-info" to="/add-to-cart">add to cart</Link>
                      </div> 
                </div>
                
            </div>
        </div>
    </div>
    
    
    
    </>
   )

 }
 export default SingleProduct