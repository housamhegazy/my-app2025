
import { Helmet } from "react-helmet-async";
import "./modal.css";

const Modal = ({ children, setshowbox, title, modalclass }) => {
  //close modal func
  const CloseModal = () => {
    setshowbox(false);
  };

  return (
    <div className="Modal-container">

  
      <form className={`modal ${modalclass}`}>
        <span
          className="close"
          onClick={() => {
            CloseModal();
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </span>
        <h3>{title}</h3>
        {children}
      </form>
    </div>
  );
};

export default Modal;
