import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainComp from "../components/MainComp";
import { Helmet } from "react-helmet-async";
const Html = () => {
  return (
    <>
    <Helmet>
        <meta name="description" content="the page of html codes" />
        <link rel="icon" type="image/png" href="./public/suit.png" />
        <title>Html Page</title>

        {/* <style type="text/css">
          {
            `
            main{
            color:red
            }
            `
          }
        </style> */}
      </Helmet>
      <Header />
      {/* Main content */}
      <MainComp pageName="Html page" color={"green"}/>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Html;
