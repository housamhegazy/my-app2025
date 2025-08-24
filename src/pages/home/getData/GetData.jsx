import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";
import LoadingSpinner from "../../../pages/loading/LoadingPage";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

const GetData = ({ user }) => {
  const [initialData, setInitialData] = useState(
    query(collection(db, user.uid), orderBy("id", "asc"))
  );

  const completedTasks = query(
    collection(db, user.uid),
    where("completed", "==", true)
  );
  const incompletedTasks = query(
    collection(db, user.uid),
    where("completed", "==", false)
  );
  const [value, loading, error] = useCollection(initialData);
  const [isFullOpacity, setIsFullOpacity] = useState(false);
  const [selectValue, setselectValue] = useState("All Tasks");

  const handleSelectFunc = (e) => {
    setselectValue(e.target.value);
    if (e.target.value == "completed") {
      setInitialData(completedTasks);
    } else if (e.target.value == "incompleted") {
      setInitialData(incompletedTasks);
    } else if (e.target.value == "all") {
      setIsFullOpacity(false);
      setInitialData(query(collection(db, user.uid), orderBy("id")));
    }
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <main>{error.message}</main>;
  }
  if (value) {
    // if (value.docs.length == 0) {
    //   return (
    //     <section
    //       style={{ height: "400px", lineHeight: "400px", fontSize: "20px" }}
    //     >
    //       No Tasks
    //     </section>
    //   );
    // }
    return (
      <div className="getData">
        <section className="parent-of-btns mttt">
          <button
            style={{ opacity: isFullOpacity ? "1" : ".3" }}
            onClick={() => {
              setInitialData(
                query(collection(db, user.uid), orderBy("id", "desc"))
              );
              setIsFullOpacity(true);
            }}
            className="orderbtn"
          >
            Newest First
          </button>
          <button
            style={{ opacity: isFullOpacity ? ".3" : "1" }}
            onClick={() => {
              setInitialData(
                query(collection(db, user.uid), orderBy("id", "asc"))
              );
              setIsFullOpacity(false);
            }}
            className="orderbtn"
          >
            Oldest First
          </button>

          <div className="custom-select-wrapper">
            <select
              value={selectValue}
              onChange={(e) => {
                handleSelectFunc(e);
              }}
              name="cars"
              id="cars-select"
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="incompleted">Incompleted</option>
            </select>
          </div>
        </section>
        <section className="tasks-section">
          {value.docs.length == 0 ? (
            <section>no data</section>
          ) : (
            value.docs.map((item, index) => {
              return (
                <Link key={index} to={`/edittask/${item.data().id}`}>
                  <article
                    className="one-task"
                    dir="auto"
                    style={{ height: "100%" }}
                  >
                    <h2>{item.data().title}</h2>
                    <ul className="list">
                      {item.data().tasks.map((task, index) => {
                        if (index < 2) {
                          return <li key={index}>{task} </li>;
                        } else {
                          return;
                        }
                      })}
                    </ul>
                    <span className="time">
                      Created :{" "}
                      {formatDistanceToNow(item.data().id, {
                        addSuffix: true,
                        locale: enUS,
                      })}
                    </span>
                  </article>
                </Link>
              );
            })
          )}
        </section>
      </div>
    );
  }
};

export default GetData;
