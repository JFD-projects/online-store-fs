import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUser } from "../../store/users";
import { formatPrice } from "../../utils/formatPrice";
import history from "../../utils/history";

const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserData());
  const cart = currentUser ? currentUser.cart : [];
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
    <div>
      {products.map((item) => {
        const inCart = cart.includes(item._id);
        return (
          <div key={item._id} className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4 d-flex align-items-center justify-content-center">
                <img src={item.photo} className="img-fluid rounded-start" alt="img" width="140" height="140"/>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">Стоимость: {formatPrice(+item.price)}
                  </p>
                  <Link className="btn btn-primary" to={`/product/${item._id}`}>Подробнее</Link>
                  {!inCart
                      ? <button onClick={() => buttonClickHandler(item._id)} className="btn btn-success mx-2">
                        <i className="bi bi-cart-plus"/>
                        {" в корзину"}
                      </button>
                      : <Link to="/cart" className="btn btn-outline-success mx-2">
                        <i className="bi bi-cart-check"/>
                        {" в корзине"}
                      </Link>}
                </div>
              </div>
            </div>
          </div>);
        }
      )}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductList;
