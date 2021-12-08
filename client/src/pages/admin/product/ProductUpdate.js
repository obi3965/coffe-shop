import React,{ useState, useEffect, Fragment} from "react";
import AdminNav from "../../../components/adminNav/AdminNav";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import ProductUpdateForm from "../../../components/form/ProductUpdateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import Loader from "../../../components/layout/Loader";
import FileUpload from "../../../components/form/FileUpload";
import { toast } from "react-toastify";


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
    brands: ["Good Bar", "Bistro Bar", "Argentina", "Ethopian", "Arabic"],
    color: "",
    brand: "",
  };
  

const ProductUpdate = ({match, history}) => {

    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);
  
    const { user } = useSelector((state) => ({ ...state }));
    // router
    const { slug } = match.params;
  
    useEffect(() => {
      loadProduct();
      loadCategories();
    }, []);
  
    const loadProduct = () => {
      getProduct(slug).then((p) => {
        // console.log("single product", p);
        // 1 load single proudct
        setValues({ ...values, ...p.data });
        // 2 load single product category subs
        getCategorySubs(p.data.category._id).then((res) => {
          setSubOptions(res.data); // on first load, show default subs
        });
        // 3 prepare array of sub ids to show as default sub values in antd Select
        let arr = [];
        p.data.subs.map((s) => {
          arr.push(s._id);
        });
        console.log("ARR", arr);
        setArrayOfSubs((prev) => arr); // required for ant design select to work
      });
    };
  
    const loadCategories = () =>
      getCategories().then((c) => {
        console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
        setCategories(c.data);
      });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
  
      values.subs = arrayOfSubs;
      values.category = selectedCategory ? selectedCategory : values.category;
  
      updateProduct(slug, values, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`${res.data.title} is updated`);
          history.push("/admin/products");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error(err.response.data.msg);
        });
    };
  
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
      // console.log(e.target.name, " ----- ", e.target.value);
    };
  
    const handleCategoryChange = (e) => {
      e.preventDefault();
      console.log("CLICKED CATEGORY", e.target.value);
      setValues({ ...values, subs: [] });
  
      setSelectedCategory(e.target.value);
  
      getCategorySubs(e.target.value).then((res) => {
        console.log("SUB OPTIONS ON CATGORY CLICK", res);
        setSubOptions(res.data);
      });
  
      console.log("EXISTING CATEGORY values.category", values.category);
  
      // if user clicks back to the original category
      // show its sub categories in default
      if (values.category._id === e.target.value) {
        loadProduct();
      }
      // clear old sub category ids
      setArrayOfSubs([]);
    };

  
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col-md-10">
              <Fragment>
          {loading ?  (
            
            <Loader />
             
              
            ):(  
                <Fragment>
            <h1 className="text-white">update product</h1> 
            <div className="p-3">
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
            </div>
            </Fragment>
              )}
            </Fragment>
            

          <ProductUpdateForm
           handleSubmit={handleSubmit}
           handleChange={handleChange}
           setValues={setValues}
           values={values}
           handleCategoryChange={handleCategoryChange}
           categories={categories}
           subOptions={subOptions}
           arrayOfSubs={arrayOfSubs}
           setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
        </div>
      </div>
    </>
  );
};
export default ProductUpdate;
