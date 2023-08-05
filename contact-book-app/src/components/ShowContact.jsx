import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { AiOutlineUser, AiOutlineWhatsApp } from "react-icons/ai";

import { db } from "../firebase/firebaseConfig";
import { Link, useNavigate, useParams } from "react-router-dom";
import photo from "../assets/user.png";

export default function ShowContact() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  useEffect(() => {
    const getDataByID = async () => {
      try {
        const docRef = doc(db, "contact", id);
        const docSnap = await getDoc(docRef);
        setData(docSnap.data());
      } catch (err) {
        navigate("/");
      }
    };
    getDataByID();
  }, []);

  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-sky-500 flex items-center justify-center">
      <div className="bg-white p-2 py-7 px-2.5 w-[300px]">
        <h2 className="text-2xl py-3 font-semibold text-center">Contact</h2>
        <div className="flex justify-center h-[100px] mb-10">
          <img
            src={data["image"] === null ? photo : data.image}
            className="rounded-full h-[120px] w-[120px]"
            alt="Profile pic"
          />
        </div>

        <div className="flex my-3 items-center text-xl">
          <AiOutlineUser />
          &nbsp;&nbsp;
          {data.name}
        </div>
        <div className="flex my-3 items-center text-lg">
          <AiOutlineUser />
          &nbsp;&nbsp;
          {data.email}
        </div>
        <div className="flex my-3 items-center  text-xl">
          <AiOutlineWhatsApp />
          &nbsp;&nbsp;
          {data.phone}
        </div>

        <Link to={"/"}>
          <button
            type="button"
            className="p-1.5 w-[100%] rounded mt-4 bg-blue-950 text-white font-semibold tracking-widest"
          >
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
}
