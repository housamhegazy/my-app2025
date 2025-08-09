import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingPage";
import Error from "../components/Error";
import { sendEmailVerification } from "firebase/auth";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    {
      !user && !loading && navigate("/signin");
    }
  }, [user]);

  if (loading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title> home page </title>
          <meta name="description" content="the page of home codes" />
        </Helmet>
        {/* header  */}

        <Header />
        <main>
          <h3 style={{ color: "green" }}>
            please{" "}
            <NavLink style={{ color: "red" }} to={"./signin"}>
              sign in
            </NavLink>{" "}
            to see content
          </h3>
        </main>
        <Footer />
      </>
    );
  }
  if (!user.emailVerified) {
    return (
      <>
        <Helmet>
          <title> home page </title>
          <meta name="description" content="the page of home codes" />
        </Helmet>
        {/* header  */}

        <Header />
        <main style={{display:"flex",flexDirection:"column"}}>
          <div>Hello: {user.displayName}</div>

          <h3 style={{ color: "red" }}>
            {" "}
            please verify your email to see content{" "}
          </h3>
          <button onClick={()=>{
            sendEmailVerification(auth.currentUser).then(() => {
                                  // Email verification sent!
                                  // ...
                                  
                                });
          }}>send again</button>
        </main>

        {/* Footer */}
        <Footer />
      </>
    );
  }
  if (user) {
    return (
      <>
        <Helmet>
          <title> home page </title>
          <meta name="description" content="the page of home codes" />
        </Helmet>
        {/* header  */}

        <Header />
        <main>
          <h3 style={{ color: "green" }}> Welcome : {user.displayName}</h3>
        </main>

        {/* Footer */}
        <Footer />
      </>
    );
  }
  if (error) {
    return <Error />;
  }
};

export default Home;
