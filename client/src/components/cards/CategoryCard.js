import React from "react";
import { Link } from "react-router-dom";
//import { Link } from "react-router-dom";
import "../cards/categoryCard.css";

const CategoryCard = ({ category }) => {
  const { name } = category;
  return (
    <>
      <ul className="flex-column c-card-box">
        <li className="nav-item card-title text-white">
          <Link className="nav-link link" to="">
      
             {name}   +
          </Link>
        </li>
      </ul>
    </>
  );
};

export default CategoryCard;
