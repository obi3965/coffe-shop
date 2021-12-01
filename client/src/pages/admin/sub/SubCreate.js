import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/adminNav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import Loader from "../../../components/layout/Loader";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/form/CategoryForm";
import LocalSearch from "../../../components/form/LocalSearch";
import { createSub, removeSub, getSubs } from "../../../functions/subCategory";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);
  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
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
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data.msg);
          }
        });
    }
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 col-md-3 AdminNav">
          <AdminNav />
        </div>
        <div className="col-lg-10 col-md-9 col-sm-6">
          

          {loading ? (
            <Loader />
          ) : (
              <>
            <div className="createForm">
            <div className="form-group">
              <label>Parent category</label>

              <select
                name="category"
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Please select</option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
            <div className="createForm">
              <CategoryForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
              />
            </div>
            </>
          )}

          {/* step 2 and step 3 */}
          <hr className="bg-info" />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <hr className="bg-info" />
          {/* step 5 */}

          <div className="container">
            <div className="row">
              {subs.filter(searched(keyword)).map((s) => {
                return (
                  <div className="col-lg-12" key={s._id}>
                    <div className="c-box alert alert-primary">
                      <div className="title align-items-center">
                        <h3>{s.name}</h3>
                      </div>
                      <div className="c-btn float-right">
                        <span className="btn btn-success">
                          <Link to={`/admin/sub/${s.slug}`}>Edit</Link>
                        </span>
                        <span
                          className="btn btn-danger"
                          onClick={() => handleRemove(s.slug)}
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

export default SubCreate;
