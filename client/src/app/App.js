import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Products from "./layouts/products";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";
import Add from "./layouts/add";
import Cart from "./layouts/cart";

function App() {
  return (
    <div>
      <AppLoader>
        <NavBar/>
        <Switch>
          <Route
            path="/product/:productId?"
            component={Products}
          />
          <ProtectedRoute path="/add" component={Add}/>
          <ProtectedRoute path="/cart" component={Cart}/>
          <Route path="/login/:type?" component={Login}/>
          <Route path="/logout" component={LogOut}/>
          <Route path="/" exact component={Main}/>
          <Redirect to="/"/>
        </Switch>
        <ToastContainer/>
      </AppLoader>
    </div>
  );
}

export default App;
