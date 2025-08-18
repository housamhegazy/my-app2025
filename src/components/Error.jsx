import React from "react";
import Header from "./Header";
import Footer from "./Footer";
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
      <main><Link to ='./'> Home </Link></main>
      <Footer />
    </>
  );
};

export default Error;
