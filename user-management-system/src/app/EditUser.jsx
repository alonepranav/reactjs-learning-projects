import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND } from "../App";
import { useEffect } from "react";

export default function EditUser() {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [formData, setFormData] = useState({
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
        setFormData({ ...res.data.data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND}/user/edituser`, {
        ...formData,
        _id,
      });
      if (res.data.success) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen bg-slate-100">
        <div className="mx-2 w-full md:w-1/2 bg-white p-5 rounded">
          <form onSubmit={handleSubmit}>
            <h4 className="font-semibold text-3xl mb-5">
              Edit <span className="text-sky-500">User</span>
            </h4>

            <input
              type="text"
              className="bg-gray-200 py-1.5 px-2 my-2.5 w-full  outline-1 outline-sky-500 placeholder:text-gray-600 placeholder:text-sm"
              placeholder="First name"
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />

            <input
              type="text"
              className="bg-gray-200 py-1.5 px-2 my-2.5 w-full  outline-1 outline-sky-500 placeholder:text-gray-600 placeholder:text-sm"
              placeholder="Last name"
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />

            <input
              type="email"
              className="bg-gray-200 py-1.5 px-2 my-2.5 w-full  outline-1 outline-sky-500 placeholder:text-gray-600 placeholder:text-sm"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              type="number"
              className="bg-gray-200 py-1.5 px-2 my-2.5 w-full  outline-1 outline-sky-500 placeholder:text-gray-600 placeholder:text-sm"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <input
              type="submit"
              className="bg-sky-500 font-bold text-white py-1.5 px-5 rounded-sm my-2.5"
              value="Edit user"
            />
          </form>
        </div>
      </div>
    </>
  );
}
