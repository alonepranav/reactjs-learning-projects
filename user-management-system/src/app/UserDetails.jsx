import axios from "axios";
import React, { useState } from "react";
import { Link,  useNavigate, useParams } from "react-router-dom";
import { BACKEND } from "../App";
import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function UserDetails() {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const getData = async () => {
    try {
      const res = await axios.post(`${BACKEND}/user/getuserdatabyid`, {
        _id,
      });

      if (res.data.success) {
        setData({ ...res.data.data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="h-full w-screen bg-slate-100 p-5">
        <div className="text-2xl mx-5">
          <h3 className="">Name : {`${data.firstName} ${data.lastName}`}</h3>
          <br />
          <h3 className="">Email : {`${data.email} `}</h3>
          <br />
          <h3 className="">Phone : {`${data.phone} `}</h3>
          <br />
          <Link to="/dashboard" replace={true}>
            <button className="flex gap-2 justify-center items-center bg-blue-600 py-2 px-5 text-lg rounded text-white mr-2">
              <span>Go back</span>
              <AiOutlineArrowLeft />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
