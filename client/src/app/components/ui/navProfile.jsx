import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData());
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };
  if (!currentUser) return "Loading";
  return (
      <>
        <div className="dropdown col" onClick={toggleMenu}>
          <div className="btn link-light dropdown-toggle d-flex align-items-center">
            <div className="me-2">{currentUser.name}</div>
            <i className="bi bi-person-circle mx-2"/>
          </div>
          <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
            <Link to="/logout" className="dropdown-item">
              Выйти
            </Link>
          </div>
        </div>
        <Link to="/cart" className="btn btn-outline-success">
          <i className="bi bi-cart"/>
        </Link>
      </>
  );
};

export default NavProfile;
