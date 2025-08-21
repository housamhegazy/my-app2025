import { db } from "../../firebase/config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";

const BtnsSection = ({ user, id }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, id));
  const [addTask, setAddTask] = useState(false);
  const [inputValue, setInputValue] = useState("");

  //add input value to
  const addInputValue = (e) => {
    setInputValue(e.target.value);
  };
  //add new task to firestore
  const addTaskFunc = async (inputValue) => {
    if (inputValue.trim() !== "") {
      await updateDoc(doc(db, user.uid, id), {
        tasks: arrayUnion(inputValue),
      });
    }
    setInputValue("");
  };
  if (loading) {
    return <div>loading ...... </div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (value) {
    return (
      <section
        className="btns center mt flex"
        style={{ flexDirection: "column" }}
      >
        {addTask && (
          <form className="add-task">
            <input
              onChange={(e) => {
                addInputValue(e);
              }}
              value={inputValue}
              className="input-field"
              type="text"
              placeholder="type your task"
            />
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addTaskFunc(inputValue);
                }}
                className="greenBtn"
              >
                add
              </button>
              <i
                onClick={() => {
                  setAddTask(false);
                }}
                className="fa-solid fa-xmark"
              ></i>
            </div>
          </form>
        )}
        <button
          onClick={() => {
            setAddTask(true);
          }}
          className="add-more-btn"
        >
          Add More <i className="fa-solid fa-plus"></i>
        </button>
        <button className="delete mtt">Delete Task </button>
      </section>
    );
  }
};

export default BtnsSection;
