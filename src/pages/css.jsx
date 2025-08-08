import Header from "../components/Header";
import Footer from "../components/Footer";
import MainComp from "../components/MainComp";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Css = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    {
      !user && navigate("/signin");
    }
  }, [user]);

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
