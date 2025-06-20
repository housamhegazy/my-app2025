import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainComp from "../components/MainComp";

const Html = () => {
  return (
    <>
      <Header />
      {/* Main content */}
      <MainComp pageName="Html page"/>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Html;
