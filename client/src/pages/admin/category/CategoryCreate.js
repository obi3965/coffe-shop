import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/adminNav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "../../../styles/categoryCreate.css";

import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import Loader from "../../../components/layout/Loader";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/form/CategoryForm";
import LocalSearch from "../../../components/form/LocalSearch";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // step 1
  const [keyword, setKeyword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data.msg);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          console.log("deleted", res);
          setLoading(false);
          toast.error(`${res.data.name} is deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-6 AdminNav">
          <div className="adminNav">
            <AdminNav />
          </div>
        </div>
        <div className="col-lg-9 col-md-9 col-sm-6">
          {loading ? <Loader /> : <h4>Create category</h4>}
          <div className="createForm">
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
          </div>
          <hr className="bg-info" />
          {/* step 2 and step 3 */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <hr className="bg-info" />

          <div className="container">
            <div className="row">
              {categories.filter(searched(keyword)).map((c) => {
                return (
                  <div className="col-lg-12" key={c._id}>
                    <div className="c-box alert alert-primary">
                      <div className="title align-items-center">
                        <h3>{c.name}</h3>
                      </div>
                      <div className="c-btn float-right">
                        <span className="btn btn-success">
                          <Link to={`/admin/category/${c.slug}`}>Edit</Link>
                        </span>
                        <span
                          className="btn btn-danger"
                          onClick={() => handleRemove(c.slug)}
                        >
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
