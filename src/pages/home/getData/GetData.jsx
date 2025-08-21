import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import LoadingSpinner from "../../../pages/loading/LoadingPage";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { arSA, enUS } from "date-fns/locale";

const GetData = ({ user }) => {
  const [value, loading, error] = useCollection(collection(db, user.uid));
  if (loading) {
    return <LoadingSpinner />;
  }
  if(error){
    return(<main>{error.message}</main>)
  }
  if(value){
    return (
    <section className="tasks-section">
      {value.docs.map((item, index) => {
        return (
          <article key={index} className="one-task" dir="auto">
            <Link to={`/edittask/${item.data().id}`}>
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
              <span className="time">Created :{" "}
                {formatDistanceToNow((item.data().id), {
                  addSuffix: true,
                  locale: enUS,
                })}</span>
            </Link>
          </article>
        );
      })}
    </section>
  );
  }
};

export default GetData;
