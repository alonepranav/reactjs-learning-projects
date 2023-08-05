import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BACKEND } from "../App";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${BACKEND}/user/getusers`);
      if (res.data.success) {
        setData([...res.data.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (_id) => {
    try {
      const res = await axios.post(`${BACKEND}/user/deleteuser`, {
        _id,
      });
      if (res.data.success) {
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto">
        <Link to={"/adduser"}>
          <button className="bg-emerald-400 px-5 mx-5 text-white text-sm py-2 font-semibold mt-10 rounded">
            Add User
          </button>
        </Link>

        <br />
        <br />
        <hr className="bg-gray-300 mx-5 h-[2px]" />
        <br />

        <table className="w-full text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xl text-gray-900 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">
                First Name
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Last Name
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Phone
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Email
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!data.length ? (
              <tr>
                <td>
                  <p className="mx-5 text-2xl my-5">No User Present</p>
                </td>
              </tr>
            ) : (
              data.map((user) => {
                return (
                  <tr key={user._id} className="bg-white dark:bg-gray-800">
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.firstName}
                    </th>
                    <td className="px-5 py-4">{user.lastName}</td>
                    <td className="px-5 py-4">{user.email}</td>
                    <td className="px-5 py-4">{user.phone}</td>
                    <td className="px-5 py-4">
                      <Link to={`/user/${user._id}`}>
                        <button className="bg-blue-600 p-2 px-5 rounded text-white mr-2">
                          <AiFillEye />
                        </button>
                      </Link>
                      <Link to={`/edituser/${user._id}`}>
                        <button className="bg-yellow-400 p-2 px-5 rounded text-white mr-2">
                          <HiOutlinePencil />
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 p-2 px-5 rounded text-white mr-2"
                        onClick={() => deleteUser(user._id)}
                      >
                        <AiFillDelete />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
