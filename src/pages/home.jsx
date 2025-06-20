import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainComp from "../components/MainComp";

const Home = () => {
  return (
    <>
      {/* header  */}
      <Header />
      <MainComp pageName="Home page"/>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
