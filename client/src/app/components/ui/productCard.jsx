import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUser } from "../../store/users";
import { Link } from "react-router-dom";
import Category from "./category";
import history from "../../utils/history";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserData());
  const cart = currentUser ? currentUser.cart : [];
  const inCart = cart.includes(product._id);
  const addToCart = (id) => {
    dispatch(updateUser({
      ...currentUser,
      cart: [...cart, id]
    }));
  };
  const buttonClickHandler = (id) => {
    if (!currentUser) {
      history.push("/login");
      return;
    }
    addToCart(id);
  };

  return (
      <div className="card mb-3">
        <div style={{ height: "400px" }} className="p-5">
          <img src={product.photo} className="card-img-top img-fluid" style={{ maxHeight: "100%", objectFit: "contain" }} alt="photo"/>
        </div>
        <div className="card-body">
          <Category id={product.category}/>
          <h5 className="card-title fs-1">{product.name}</h5>
          <p className="card-text fs-3">{product.description}</p>
          {!inCart
              ? <button onClick={() => buttonClickHandler(product._id)} className="btn btn-success btn-lg mx-2">
                <i className="bi bi-cart-plus"/>
                {" в корзину"}
              </button>
              : <Link to="/cart" className="btn btn-outline-success btn-lg mx-2">
                <i className="bi bi-cart-check"/>
                {" в корзине"}
              </Link>}
        </div>
      </div>
  );
};
ProductCard.propTypes = {
  product: PropTypes.object
};

export default ProductCard;
