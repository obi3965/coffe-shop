import React,{useState, useEffect} from "react";
import AdminNav from "../../../components/adminNav/AdminNav";
import { toast } from "react-toastify";
import { useSelector,  } from "react-redux";
import '../../../styles/categoryCreate.css'
import { getCategory, updateCategory} from "../../../functions/category";
import Loader from "../../../components/layout/Loader";
import CategoryForm from "../../../components/form/CategoryForm";

export const CategoryUpdate = ({history, match}) => {

    const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, [history]);
  
  const loadCategory = () =>
    getCategory(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        
        history.push("/admin/category");
     
      })
      .catch((err) => {
        console.log(err);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data.msg);
      });
  };
  


  return(
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 col-md-3 col-sm-6 AdminNav">
          <div className="adminNav">
            <AdminNav />
          </div>
        </div>
        <div className="col-lg-10 col-md-9 col-sm-6">
        {loading ? (
            <Loader />
          ) : (
           <h2>category update</h2>
          )}
          <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
         
        </div>
        </div>
        </div>
   )

 }