import React from "react";
import { Link } from "react-router-dom";

import "../../styles/admindashboard.css";

const AdminProductCard = ({ product, handleRemove }) => {
    const { images, title, description, slug } = product


  return (
    <div className="card">
      <img style={{ height: "150px", objectFit: "cover" }}
        src={
          images && images.length ? images[0].url : ""
        }
        className="card-img-top"
      />
      <div className="card-body">
        <h3 className="card-title text-white">{title}</h3>
        <p className="card-text text-white">{description}</p>
      </div>
      <div className="crud">
          <button className="btn btn-danger" onClick={() => handleRemove(slug)}>Delete</button>
          <Link className="btn btn-success" to={`/admin/product/${slug}`}>Edit</Link>
      </div>
    </div>
  );
};

export default AdminProductCard;
