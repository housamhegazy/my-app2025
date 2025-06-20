import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainComp from "../components/MainComp";

const Error = () => {
  return (
    <>
      <Header />
      <MainComp pageName=" ...... sorry page not found , go to " color="red" />
      <Footer />
    </>
  );
};

export default Error;
