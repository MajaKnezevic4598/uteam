import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import Login from "../components/Login";

function ProtectedRoutes() {
  //here we need to do some authenticated check
  //from AuthContext we can use isLoggedIn variable

  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Outlet /> : <Login />;
}

export default ProtectedRoutes;
