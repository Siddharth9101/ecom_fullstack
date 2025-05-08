import React from "react";
import OfferBar from "../ui/OfferBar";
import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <OfferBar />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLayout;
