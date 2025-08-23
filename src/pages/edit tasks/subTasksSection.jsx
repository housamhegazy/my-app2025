import { formatDistanceToNow } from "date-fns";
import { db } from "../../firebase/config";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { enUS } from "date-fns/locale";
import { Oval } from "react-loader-spinner";

const SubTasksSection = ({ user, id, handleRemoveFun, updateDataFunc }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, id));
  const updateTaskFunc = () => {};
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
    return <div>{error.message}</div>;
  }
  if (value) {
    return (
      <section className="sub-task">
        <div className="first-box flex">
          <p className="time">
            created :{" "}
            {formatDistanceToNow(value.data().id, {
              addSuffix: true,
              locale: enUS,
            })}{" "}
          </p>
          <label className="custom-checkbox">
            <input
              onChange={(e) => {
                updateDataFunc(e);
              }}
              checked={value.data().completed}
              type="checkbox"
            />
            <span className="checkmark"></span>
            {value.data().completed === true ? "completed" : "incompleted"}
          </label>
        </div>
        <ul>
          {value.data().tasks.map((item, index) => {
            return (
              <li key={index} className="card-task">
                <p className="card-name">{item}</p>
                <div>
                  <i
                    onClick={() => {
                      updateTaskFunc();
                    }}
                    className="fa-solid fa-pen"
                  ></i>
                  <i
                    onClick={() => {
                      handleRemoveFun(item);
                    }}
                    className="fa-solid fa-trash"
                  ></i>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
};

export default SubTasksSection;
