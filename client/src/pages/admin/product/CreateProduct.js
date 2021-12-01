import React, { useState } from "react";
import AdminNav from "../../../components/adminNav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "../product/product.css";

import {
  createProduct,
 
} from "../../../functions/product";
import ProductCreateForm from "../../../components/form/CreateProductForm";
// import Loader from "../../../components/layout/Loader";
// import { Link } from "react-router-dom";


const initialState = {
  title: "Macbook Pro",
  description: "This is the best Apple product",
  price: "45000",
  categories: [],
  category: "",
  subs: [],
  shipping: "Yes",
  quantity: "50",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "White",
  brand: "Apple",
};


  const CreateProduct = () => {
    const [values, setValues] = useState(initialState);

    // redux
    const { user } = useSelector((state) => ({ ...state }));
  
    // destructure
    const {
      title,
      description,
      price,
      categories,
      category,
      subs,
      shipping,
      quantity,
      images,
      colors,
      brands,
      color,
      brand,
    } = values;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      createProduct(values, user.token)
        .then((res) => {
          console.log(res);
          window.alert(`"${res.data.title}" is created`);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) toast.error(err.response.data);
        });
    };
  
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
      // console.log(e.target.name, " ----- ", e.target.value);
    };
  
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminNav />
          </div>
  
          <div className="col-md-9">
            <h4>Product create</h4>
            <hr />
  
            <ProductCreateForm handleSubmit={handleSubmit} handleChange={handleChange} values={values} />
          </div>
        </div>
      </div>
    );
  };
  export default CreateProduct;