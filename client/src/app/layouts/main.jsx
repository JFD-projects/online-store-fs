import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
      <div className="container-fluid mt-5">
        <div className="d-flex flex-column align-items-center">
          <h1><span className="text-uppercase">Online Store</span> - Главная страница</h1>
          <Link className="btn btn-lg btn-primary my-3 fs-1" to="/product">В каталог</Link>
        </div>
      </div>
  );
};

export default Main;
