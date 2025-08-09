import { React, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainComp from "../components/MainComp";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import LoadingSpinner from "./LoadingPage";

const Html = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    !user && !loading && navigate("/signin");
    if(user){
      if (!user.emailVerified) {
      navigate("/")
    }
    }
  });

  if (loading) {
    return <LoadingSpinner />;
  }
  if (user) {
    
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <meta name="description" content="the page of html codes" />
            <link rel="icon" type="image/png" href="./public/suit.png" />
            <title>Html Page</title>
          </Helmet>

          {loading && <LoadingSpinner />}
          {user && (
            <>
              <Header />
              {/* Main content */}
              <MainComp pageName="Html page" color={"green"} />
              {/* Footer */}
              <Footer />
            </>
          )}
        </>
      );
    }
  }
};

export default Html;
