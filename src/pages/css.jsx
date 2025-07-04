import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainComp from "../components/MainComp";
import { Helmet } from "react-helmet-async";
const Css = () => {
  return (
    <div>
      <Helmet>
        <title>Css page </title>
        <meta name="description" content="the page of css codes" />
      </Helmet>
      <Header />
      <MainComp pageName="Css page" />
      <Footer />
    </div>
  );
};

export default Css;
