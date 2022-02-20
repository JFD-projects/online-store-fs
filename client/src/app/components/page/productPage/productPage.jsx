import React from "react";
import PropTypes from "prop-types";
import ProductCard from "../../ui/productCard";
import { useSelector } from "react-redux";
import { getProductById } from "../../../store/products";

const ProductPage = ({ productId }) => {
  const product = useSelector(getProductById(productId));

  if (product) {
    return (
        <div className="container-fluid">
          <ProductCard product={product}/>
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
            </div>
          </div>
        </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

ProductPage.propTypes = {
  productId: PropTypes.string.isRequired
};

export default ProductPage;
