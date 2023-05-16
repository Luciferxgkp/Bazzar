import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { getAllCategory } from "../../actions";
import { useNavigate } from "react-router-dom";
function Menuheader(props) {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);
  let mycategories = [];
  const renderCategories = (categories) => {
    let mycategories = [];
    for (let category of categories) {
      mycategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <div
              onClick={() => {
                navigate(
                  `/${category.slug}?cid=${category._id}&type=${category.type}`
                );
              }}
            >
              {category.name}
            </div>
          ) : (
            <span>{category.name}</span>
          )}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return mycategories;
  };
  return (
    <div className="menuheader shadow-lg hidden sm:block">
      <ul>
        {category.categories.length > 0
          ? renderCategories(category.categories)
          : null}
      </ul>
    </div>
  );
}
export default Menuheader;
