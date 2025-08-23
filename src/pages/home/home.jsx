import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoadingSpinner from "../loading/LoadingPage";
import { sendEmailVerification } from "firebase/auth";
import "./Home.css";
import { doc, setDoc } from "firebase/firestore";
import HomeModal from "./HomeModal/HomeModal";
import GetData from "./getData/GetData";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [showbox, setshowbox] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPopUpMsg, setPopUpMsg] = useState(false);
  const [errorMsg, seterrorMsg] = useState(false);

  useEffect(() => {
    {
      !user && !loading && navigate("/signin");
    }
  });

  // modal functions
  const setTitlefunc = (e) => {
    setTaskTitle(e.target.value);
  };
  const setItemFunc = (e) => {
    setInputValue(e.target.value);
  };
  const handleAddItem = () => {
    // Check if the input value is not empty
    if (inputValue.trim() !== "") {
      //check if the array include the item or not
      if (!items.includes(inputValue)) {
        // Use the spread operator to create a new array
        const newItems = [...items, inputValue];
        setItems(newItems);
      }
      // Clear the input field
      setInputValue("");
      seterrorMsg(false);
    }
  };

  const AddItemsToDBfunc = async () => {
    if (items.length > 0 && taskTitle) {
      setShowSpinner(true);
      const taskId = new Date().getTime();
      await setDoc(doc(db, user.uid, `${taskId}`), {
        title: taskTitle,
        id: taskId,
        tasks: items,
        completed: false,
      });
      setItems([]);
      setTaskTitle("");
      setShowSpinner(false);
      setshowbox(false);
      setPopUpMsg(true);
      seterrorMsg(false);
      setTimeout(() => {
        setPopUpMsg(false);
      }, 3000);
    } else {
      seterrorMsg(true);
    }
  };
  const modalItemeDelete = (indexToDelete) => {
    const newItems = items.filter((a, index) => index !== indexToDelete);
    setItems(newItems);
  };

  // completed and incompleted functions

  if (loading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  if (error) {
    return <main>{error.message}</main>;
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
          <h3 className="welcome">
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
        <main
          className="home"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="welcome">Hello: {user.displayName}</div>

          <h3 style={{ color: "red" }}>
            {" "}
            please verify your email to see content{" "}
          </h3>
          <button
            onClick={() => {
              sendEmailVerification(auth.currentUser).then(() => {
                // Email verification sent!
                // ...
              });
            }}
          >
            send again
          </button>
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
        <main className="home">
          <GetData user={user} />
          <section className="mttt">
            <button
              onClick={() => {
                setshowbox(true);
              }}
              className="add-new-task"
            >
              Add New Task <i className="fa-plus fa-solid"></i>
            </button>
          </section>

          {/* show box modal  */}
          {showbox && (
            <HomeModal
              setshowbox={setshowbox}
              taskTitle={taskTitle}
              setTitlefunc={setTitlefunc}
              setItemFunc={setItemFunc}
              inputValue={inputValue}
              items={items}
              AddItemsToDBfunc={AddItemsToDBfunc}
              handleAddItem={handleAddItem}
              modalItemeDelete={modalItemeDelete}
              errorMsg={errorMsg}
              showSpinner={showSpinner}
              setTaskTitle={setTaskTitle}
              setItems={setItems}
            />
          )}

          <p
            className="doneMessage"
            style={{ right: showPopUpMsg ? "30px" : "100vw" }}
          >
            {" "}
            tasks added successfully <i className="fa-solid fa-check"></i>
          </p>
        </main>

        {/* Footer */}
        <Footer />
      </>
    );
  }
};

export default Home;
