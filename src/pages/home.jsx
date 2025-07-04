import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainComp from "../components/MainComp";
import { Helmet } from "react-helmet-async";
const Home = () => {
  return (
    <>
      <Helmet>
      <title> home page </title>
        <meta name="description" content="the page of home codes" />
      </Helmet>
      {/* header  */}
      <Header />
      <MainComp pageName="Home page" />
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
