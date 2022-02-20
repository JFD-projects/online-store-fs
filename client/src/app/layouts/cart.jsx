import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "../components/common/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/products";
import { Link } from "react-router-dom";
import ProductsLoader from "../components/ui/hoc/productsLoader";
import { getCurrentUserData, updateUser } from "../store/users";
import { formatPrice } from "../utils/formatPrice";

const Cart = () => {
  const products = useSelector(getProducts());
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserData());
  const cart = currentUser.cart;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 8;

  const handleDelete = (productId) => {
    dispatch(updateUser({
      ...currentUser,
      cart: cart.filter((item) => item !== productId)
    }));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  if (!products || !cart) {
    return "Loading...";
  }
  function filterProducts(data) {
    return searchQuery
        ? data.filter((product) => product.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
        : data;
  }
  const cartProducts = cart.map((item) => products.find(p => p._id === item));
  const total = cartProducts.reduce((acc, item) => acc + (+item.price), 0);
  const filteredUsers = filterProducts(cartProducts);
  const count = filteredUsers ? filteredUsers.length : 0;
  const usersCrop = paginate(filteredUsers, currentPage, pageSize);

  return (
      <>
        <ProductsLoader>
          <div className="container-fluid">
          <input
              className="form-control w-100 mb-3"
              type="text"
              name="searchQuery"
              placeholder="Search..."
              onChange={handleSearchQuery}
              value={searchQuery}
          />
          <h1 className="card-title mb-3">Корзина</h1>
          <div className="row g-0">
            <div className="d-flex flex-column col">
              {count > 0 && (
                  <div>
                    {usersCrop.map((item) => (
                        <div key={item._id} className="card mb-3">
                          <button
                              className="position-absolute top-0 end-0 btn btn-light btn-sm link-danger fs-4"
                              onClick={() => handleDelete(item._id)}
                          >
                            <i className="bi bi-x-circle-fill"/>
                          </button>
                          <div className="row g-0">
                            <div className="col-md-4 d-flex align-items-center justify-content-center">
                              <img src={item.photo} className="img-fluid rounded-start" alt="img" width="140"
                                   height="140"/>
                            </div>
                            <div className="col-md-8">
                              <div className="card-body row g-0">
                                <div className="col">
                                  <h5 className="card-title">Название</h5>
                                  <Link to={`/product/${item._id}`} className="text-center">{item.name}</Link>
                                </div>
                                <div className="col">
                                  <h5 className="card-title text-center">Количество</h5>
                                  <p className="text-center">1</p>
                                </div>
                                <div className="col">
                                  <h5 className="card-title text-center">Стоимость</h5>
                                  <p className="text-center">{formatPrice(+item.price)}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
              )}
              <div className="d-flex justify-content-center">
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
              </div>
            </div>
            <div className="col-2 card mb-3" style={{ marginLeft: "1rem" }}>
              <div className="card-body">
                <h5 className="card-title text-center">Итого</h5>
                <p className="card-text text-center">{formatPrice(total)}</p>
                <button type="button" className="btn btn-primary w-100">Оформить заказ</button>
              </div>
            </div>
          </div>
          </div>
        </ProductsLoader>
      </>
  );
};

export default Cart;
