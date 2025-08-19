import React from "react";
import "./HomeModal.css";
import Modal from "../../../shared/modal";
import { Oval } from "react-loader-spinner";
const HomeModal = (
{  setshowbox,
  taskTitle,
  setTitlefunc,
  setItemFunc,
  inputValue,
  items,
  AddItemsToDBfunc,
  handleAddItem,
  modalItemeDelete,
  errorMsg,
  showSpinner,setTaskTitle,setItems}
) => {
  return (
    <Modal
      setshowbox={setshowbox}
      title={"add new task"}
      modalclass={"add-task-modal"} setItems={setItems} setTaskTitle={setTaskTitle}    >
      <div className="input-field" style={{ textAlign: "left" }}>
        {/* add title  */}
        <input
          value={taskTitle}
          onChange={(e) => {
            setTitlefunc(e);
          }}
          type="text"
          placeholder="title"
        />
      </div>
      <div className="input-field" style={{ textAlign: "left" }}>
        <input
          onChange={(e) => {
            setItemFunc(e);
          }}
          value={inputValue}
          type="text"
          placeholder="details"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddItem();
          }}
          className="greenBtn"
        >
          Add
        </button>
      </div>
      {/* tasks table  */}
      {items && (
        <ul className="tasks-table">
          {items.map((item, index) => {
            return (
              <li className="item" key={index}>
                {item}{" "}
                <i
                  onClick={() => modalItemeDelete(index)}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            );
          })}
        </ul>
      )}

      <button
        onClick={async (e) => {
          e.preventDefault();
          // Add a new document in collection "user.uid"
          AddItemsToDBfunc();
        }}
        className="greenBtn"
      >
        {showSpinner ? (
          <Oval
            visible={true}
            height="20"
            width="20"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          `Submitt`
        )}
      </button>
      {errorMsg ? (
        <p style={{ color: "red" }}> add at least one task & task title</p>
      ) : (
        ""
      )}
    </Modal>
  );
};

export default HomeModal;
