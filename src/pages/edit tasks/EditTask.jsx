import React, { useEffect } from "react";
import "./EditTask.css";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import LoadingSpinner from "../loading/LoadingPage";
import Error from "../../components/Error";
import TitleSection from "./TitleSection";
import SubTasksSection from "./subTasksSection";
import BtnsSection from "./BtnsSection";
const EditTask = () => {

  
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
let {id} = useParams();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/signin");
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });

  if (loading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  if (error) {
    return <main><div>{error.message}</div></main>;
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
        <main className="home">
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
  
  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <meta name="description" content="the page of edit task codes" />
            <link rel="icon" type="image/png" href="./public/suit.png" />
            <title>Edit Task</title>
          </Helmet>
          <Header />
          <div className="edit-task">
            {/* title  */}
            <TitleSection user={user} id={id}/>
            {/* sub-tasks-section */}
            <SubTasksSection user={user} id={id}/>
            <BtnsSection user={user} id={id}/>
            {/* Add more Btn & Delete Btn  */}
          </div>
          <Footer />
        </>
      );
    }
  }
  
};

export default EditTask;
