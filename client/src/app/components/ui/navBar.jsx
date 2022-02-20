import React from "react";
import { Link, NavLink } from "react-router-dom";
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-3">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link " activeClassName="active" aria-current="page" exact to="/">
                            Главная
                        </NavLink>
                    </li>
                  <li className="nav-item">
                    <NavLink
                        activeClassName="active"
                        className="nav-link "
                        aria-current="page"
                        to="/product"
                    >
                      Каталог
                    </NavLink>
                  </li>
                  {isLoggedIn && (
                        <>
                        <li className="nav-item">
                            <NavLink
                                activeClassName="active"
                                className="nav-link "
                                aria-current="page"
                                to="/add"
                            >
                                Редактировать
                            </NavLink>
                        </li>
                        </>
                    )}
                </ul>
                <div className="d-flex align-items-center navbar-nav">
                    {isLoggedIn ? (
                        <NavProfile />
                    ) : (
                        <Link
                            className="nav-link "
                            aria-current="page"
                            to="/login"
                        >
                            Войти
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
