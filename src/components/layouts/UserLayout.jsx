import React from "react";
import OfferBar from "../ui/OfferBar";
import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  const url = window.location.href;
  if (url.includes("admin")) {
    return (
      <>
        <Outlet />
      </>
    );
  }

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
