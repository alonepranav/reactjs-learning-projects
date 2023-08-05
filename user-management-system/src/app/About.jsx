import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <div className="w-screen p-3">
        <div className="mt-10">
          <h1 className="text-3xl font-semibold">User Management System</h1>
          <br />
          <p>
            This is a simple user management system project. Here we can add,
            update and delete users.
          </p>

          <br />
          <h3 className="text-left">
            Technology used
            <br />
            Frontend : ReactJS, Tailwind CSS
            <br />
            Backend : NodeJS, ExpressJS, MongoDB
          </h3>

          <Link to={"/dashboard"}>
            <button className="bg-sky-500 px-3 text-white text-sm py-2 font-semibold tracking-widest mt-10 rounded">
              Continue to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
