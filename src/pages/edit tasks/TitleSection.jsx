import { db } from "../../firebase/config";
import {  doc } from "firebase/firestore";
import React from "react";
import {  useDocument } from "react-firebase-hooks/firestore";


const TitleSection = ({ user,id }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid,id));
  // console.log(value.data().title);
if(loading){
  return(<div> loading .... </div>)
}

if(error){
  return(<main>Error: {error.message}</main>)
}
if(value){
    return (
    <section className="title center">
      <h1>
        <input
          className="title-input center"
          defaultValue={value.data().title}
          type="text"
          placeholder="hello"
        />
        <i className="fa-solid fa-pen-to-square"></i>
      </h1>
    </section>
  );
}
  return <div>No data found.</div>;

};

export default TitleSection;
