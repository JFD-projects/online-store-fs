import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCategoriesLoadingStatus, getCategoryById } from "../../store/categories";

const Category = ({ id }) => {
  const isLoading = useSelector(getCategoriesLoadingStatus());
  const category = useSelector(getCategoryById(id));
  if (isLoading || !category) {
    return "loading ...";
  }
  return <span className="badge" style={{
    backgroundColor: `var(--bs-${category.color})`,
    whiteSpace: "normal"
  }}>{category.name}</span>;
};
Category.propTypes = {
  id: PropTypes.string
};
export default Category;
