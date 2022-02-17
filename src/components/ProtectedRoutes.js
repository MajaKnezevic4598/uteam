import React from "react";

import { Outlet } from "react-router-dom";
import Login from "../components/Login";

function ProtectedRoutes() {
  //here we need to do some authenticated check
  //from AuthContext we can use isLoggedIn variable
  const isAuth = window.localStorage.getItem("auth");

  return isAuth ? <Outlet /> : <Login />;
}

export default ProtectedRoutes;
