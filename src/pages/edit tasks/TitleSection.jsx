import { db } from "../../firebase/config";
import { doc } from "firebase/firestore";
import { useRef } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Oval } from "react-loader-spinner";

const TitleSection = ({ user, id, updateTitleFunc }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, id));
  const inputRef = useRef(null);

  const handleEditTitle = () => {
    // التأكد من أن المرجع يشير إلى عنصر موجود
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (loading) {
    return (
      <div style={{ margin: "100px auto", width: "100px" }}>
        {" "}
        <Oval
          visible={true}
          height="20"
          width="20"
          color="#c9d4c9ff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />{" "}
      </div>
    );
  }

  if (error) {
    return <main>Error: {error.message}</main>;
  }
  if (value) {
    return (
      <section className="title center">
        <h1>
          <input
            style={{
              textDecoration:
                value.data().completed === true ? "line-through" : "none",
            }}
            onChange={(e) => {
              updateTitleFunc(e);
            }}
            className="title-input center"
            defaultValue={value.data().title}
            type="text"
            ref={inputRef}
            placeholder="type title ... "
          />
          <i
            onClick={() => {
              handleEditTitle();
            }}
            className="fa-solid fa-pen-to-square"
          ></i>
        </h1>
      </section>
    );
  }
  return <div>No data found.</div>;
};

export default TitleSection;
