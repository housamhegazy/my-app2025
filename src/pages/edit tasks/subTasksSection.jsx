import { formatDistanceToNow } from "date-fns";
import { db } from "../../firebase/config";
import {
  doc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { enUS } from "date-fns/locale";

const SubTasksSection = ({ user, id }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, id));

  //remove item from an array
  const handleRemoveFun = async (item) => {
    await updateDoc(doc(db, user.uid, id), {
      tasks: arrayRemove(item),
    });
  };

  let updateDataFunc = async () => {
    await updateDoc(doc(db, user.uid, id), {
      completed: value.data().completed == true ? false : true,
    });
  };

  if (loading) {
    return <div> loading .... </div>;
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
              onChange={() => {
                updateDataFunc();
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
                <i
                  onClick={() => {
                    handleRemoveFun(item);
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
};

export default SubTasksSection;
