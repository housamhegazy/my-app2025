import React, { useEffect, useState } from "react";
import "./EditTask.css";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import LoadingSpinner from "../loading/LoadingPage";
import TitleSection from "./TitleSection";
import SubTasksSection from "./subTasksSection";
import BtnsSection from "./BtnsSection";

import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  // ###############################
  //usestate for Btn Section
  // ###############################
  const [inputValue, setInputValue] = useState("");
  const [showData , setShowData] = useState(false)

  let { id } = useParams();
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
  // ###############################
  //start title section functions
  // ###############################

  const updateTitleFunc = async (e) => {
    await updateDoc(doc(db, user.uid, id), {
      title: e.target.value,
    });
  };
  // ###############################
  //start subtask section functions
  // ###############################

  //remove item from an array
  const handleRemoveFun = async (item) => {
    await updateDoc(doc(db, user.uid, id), {
      tasks: arrayRemove(item),
    });
  };
  const updateDataFunc = async (e) => {
    if (e.target.checked) {
      await updateDoc(doc(db, user.uid, id), {
        completed: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, id), {
        completed: false,
      });
    }
  };
  // ###############################
  //start btns section
  // ###############################

  //add input value to
  const addInputValue = (e) => {
    setInputValue(e.target.value);
  };
  //add new task to firestore
  const addTaskFunc = async (inputValue) => {
    if (inputValue.trim() !== "") {
      setInputValue("");
      await updateDoc(doc(db, user.uid, id), {
        tasks: arrayUnion(inputValue),
      });
    }
  };
  //remove task
  const RemoveTaskFunc = async () => {
    //حتى لايحدث خطأ اثناء حذف التاسك 
    setShowData(true)
    await deleteDoc(doc(db, user.uid, id));
    navigate("/",{replace:true});
  };

  if (loading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  if (error) {
    return (
      <main>
        <div>{error.message}</div>
      </main>
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
          {showData ? <main><LoadingSpinner/></main>: 
          <div className="edit-task">
            {/* title  */}
            <TitleSection
              updateTitleFunc={updateTitleFunc}
              user={user}
              id={id}
            />
            {/* sub-tasks-section */}
            <SubTasksSection
              user={user}
              id={id}
              handleRemoveFun={handleRemoveFun}
              updateDataFunc={updateDataFunc}
            />
            <BtnsSection
              user={user}
              id={id}
              addInputValue={addInputValue}
              addTaskFunc={addTaskFunc}
              RemoveTaskFunc={RemoveTaskFunc}
              inputValue={inputValue}
            />
            {/* Add more Btn & Delete Btn  */}
          </div>
          }
          
          <Footer />
        </>
      );
    }
  }
};

export default EditTask;
