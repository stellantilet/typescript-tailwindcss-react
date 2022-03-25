import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppContext, { AppContextValues } from "./AppContext";
import LoadingTent from "./components/LoadingTent";
import Products from "./views/Products";
import Profile from "./views/Profile";
import Users from "./views/Users";

const AppRoutes = (): React.ReactElement => {
  const { state, dispatch } = useContext(AppContext);
  AppContextValues.dispatch = dispatch;
  AppContextValues.state = state;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:username/products" element={<Products />} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <LoadingTent />
      <ToastContainer hideProgressBar autoClose={3000} />
    </>
  );
};

export default AppRoutes;
