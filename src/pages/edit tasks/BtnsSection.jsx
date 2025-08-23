import { db } from "../../firebase/config";
import { doc } from "firebase/firestore";
import React, { useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Oval } from "react-loader-spinner";

const BtnsSection = ({
  user,
  id,
  addInputValue,
  addTaskFunc,
  RemoveTaskFunc,
  inputValue,
}) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, id));
  const [addTask, setAddTask] = useState(false);

  if (loading) {
    return <div style={{margin:"100px auto" ,width:"100px"}}> <Oval
                    visible={true}
                    height="20"
                    width="20"
                    color="#c9d4c9ff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  /> </div>;
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
        {/* open box form to add new task  */}
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
              autoFocus 
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
        <button
          onClick={() => {
            RemoveTaskFunc();
          }}
          className="delete mtt"
        >
          Delete Task{" "}
        </button>
      </section>
    );
  }
};

export default BtnsSection;
