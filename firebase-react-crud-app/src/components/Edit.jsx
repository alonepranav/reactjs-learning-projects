import { collection, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../fireConfig";

export default function Edit() {
  const { id, text } = useParams();
  const collectionRef = collection(db, "data");
  const navigate = useNavigate();

  const [data, setData] = useState(text);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataDoc = doc(db, "data", id);
    await updateDoc(dataDoc, { text: data });

    navigate("/");
  };
  return (
    <div>
      <h1>Edit Data</h1>
      <form onSubmit={handleSubmit}>
        Data :{" "}
        <input
          className="in"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Edit Data</button>
        <button type="button" onClick={() => navigate("/")}>
          Go Back
        </button>
      </form>
    </div>
  );
}
