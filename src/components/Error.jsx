import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import MainComp from "./MainComp";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <>
    <Helmet>
        <title>Error ... </title>
        <meta name="description" content="the page of error codes" />
      </Helmet>
      <Header />
      <MainComp pageName={<span style={{color:"red"}}> .... sorry page not found , go to <Link to ='./'> Home </Link></span>}/>
      <Footer />
    </>
  );
};

export default Error;
