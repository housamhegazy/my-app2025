import React, { useEffect } from "react";
import "./EditTask.css";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import LoadingSpinner from "../loading/LoadingPage";
import Error from "../../components/Error";
const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

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
            <section className="title center">
              <h1>
                <input
                  className="title-input center"
                  value="housam hegazy"
                  type="text"
                  placeholder="hello"
                />
                <i className="fa-solid fa-pen-to-square"></i>
              </h1>
            </section>
            {/* sub-tasks-section */}
            <section className="sub-task">
              <div className="first-box flex">
                <p className="time">created : 6 days ago </p>
                {/* <div className="custom-checkbox">
                  <input type="checkbox" name="" id="checkbox" />
                  <label htmlFor="checkbox">completed</label>
                </div> */}
                <label className="custom-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  completed
                </label>
              </div>
              <ul>
                <li className="card-task">
                  <p className="card-name">card</p>
                  <i className="fa-solid fa-trash"></i>
                </li>
                <li className="card-task">
                  <p className="card-name">card</p>
                  <i className="fa-solid fa-trash"></i>
                </li>
                <li className="card-task">
                  <p className="card-name">card</p>
                  <i className="fa-solid fa-trash"></i>
                </li>
                
              </ul>
            </section>
            <section className="center mt flex" style={{flexDirection:"column"}}>
                  <button className="add-more-btn" >
                    Add More  <i className="fa-solid fa-plus"></i>
                  </button>
                  <button className="delete mtt">Delete Task </button>
            </section>
            {/* Add more Btn & Delete Btn  */}
          </div>
          <Footer />
        </>
      );
    }
  }
  if (error) {
    return <Error />;
  }
};

export default EditTask;
