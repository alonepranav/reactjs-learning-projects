import React, { useEffect, useRef, useState } from "react";
import "../fireConfig";
import { db } from "../fireConfig";
import {
  addDoc,
  deleteDoc,
  collection,
  getDocs,
  doc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Home() {
  const input = useRef();
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(db, "data");

  const getData = async () => {
    const res = await getDocs(collectionRef);
    if (res) {
      setLoading(false);
      setdata(() => res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = input.current.value;
    if (value.trim()) {
      await addDoc(collectionRef, { text: value });
      getData();
      input.current.value = "";
    }
  };

  const deleteDocument = async ({ id }) => {
    const dataDoc = doc(db, "data", id);
    await deleteDoc(dataDoc);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  const Item = ({ text, id }) => {
    return (
      <li>
        <p>{text}</p>
        <div className="buttons">
          <button className="delete" onClick={() => deleteDocument({ id })}>
            Delete
          </button>
          <Link to={`/edit/${id}/${text}`}>
            <button className="update">Update</button>
          </Link>
        </div>
      </li>
    );
  };

  return (
    <div>
      <h1>Firebase CRUD App </h1>
      <form onSubmit={handleSubmit}>
        Enter the text : &nbsp;
        <input className="in" type="text" ref={input} />
        <button type="submit">Add data</button>
      </form>

      <h3>Items</h3>
      <ul>
        {loading ? (
          <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
        ) : (
          data.map((text, i) => <Item key={i} {...text} />)
        )}
      </ul>
    </div>
  );
}
