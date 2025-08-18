import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LoadingSpinner from "../loading/LoadingPage";
import Error from "../../components/Error";
import { sendEmailVerification } from "firebase/auth";
import "./Home.css";
import Modal from "../../shared/modal";
import { doc, setDoc } from "firebase/firestore"; 

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [showbox, setshowbox] = useState(false);
  const [taskTitle , setTaskTitle] = useState("")
  const [items , setItems] = useState([]);
  const [inputValue , setInputValue] = useState("")
  useEffect(() => {
    {
      !user && !loading && navigate("/signin");
    }
  });

  const handleAddItem = () => {
  // Check if the input value is not empty
  if (inputValue.trim() !== '') {
    // Use the spread operator to create a new array
    const newItems = [...items, inputValue];
    setItems(newItems);
    // Clear the input field
    setInputValue('');
  }
};

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
          <section className="parent-of-btns mttt">
            <button className="orderbtn">Newest First</button>
            <button className="orderbtn">Oldest First</button>

            <div className="custom-select-wrapper">
              <select name="cars" id="cars-select">
                <option value="">All Tasks</option>
                <option value="volvo">Completed</option>
                <option value="saab">Incompleted</option>
              </select>
            </div>
          </section>
          <section className="tasks-section">
            <article className="one-task" dir="auto">
              <Link to="/edittask">
                <h2>new task</h2>
                <ul className="list">
                  <li>start task</li>
                  <li> finish task </li>
                </ul>
                <span className="time">one day ago</span>
              </Link>
            </article>
          </section>
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
            <Modal
              setshowbox={setshowbox}
              title={"add new task"}
              modalclass={"add-task-modal"}
            >
              <div style={{ textAlign: "left" }}>
              {/* add title  */}
                <input
                value={taskTitle}
                  onChange={(e) => {
                    setTaskTitle(e.target.value)
                  }}
                  type="text"
                  placeholder="title"
                />
              </div>
              <div style={{ textAlign: "left" }}>
                <input
                  onChange={(e) => {
                    setInputValue(e.target.value)
                  }}
                  value={inputValue}
                  type="text"
                  placeholder="details"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddItem()                
                  }}
                  className="greenBtn"
                >
                  Add
                </button>
              </div>
              {/* tasks table  */}
              {items && <ul className="tasks-table">
                {items.map((a,index)=>{
                  return(
                    <li key={index}>{a}</li>
                  )
                })}
              </ul>}
              
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  // Add a new document in collection "cities"
                  const taskId = new Date().getTime()
                  await setDoc(doc(db, user.uid, `${taskId}`), {
                  title: taskTitle,
                  id: taskId,
                  tasks: items
                });
                setItems([])
                setTaskTitle("")
                                }}
                className="greenBtn"
              >
                Submitt
              </button>
            </Modal>
          )}
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
