import React from "react";
import { AiFillGithub, AiFillInstagram, AiFillMail } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

export default function Navbar({ setFData, data }) {
  return (
    <>
      <div className="bg-slate-10 py-3 px-3 md:px-5 flex justify-between items-center gap-5">
        <h1 className="text-xl tracking-wider font-semibold">Notify</h1>
        <div className="w-full mx-2 md:ml-2">
          <div className="relative w-full">
            <BiSearch className="absolute top-[.5rem] left-0 text-xl" />
            <input
              type="search"
              className="p-1 border-0 border-b-2 border-slate-500 bg-white pl-7  w-full outline-none"
              placeholder="Search Note"
              onChange={(e) => {
                const te = e.target.value;
                setFData(() => {
                  return data.filter((item) => {
                    return (
                      item.title.toLowerCase().includes(te) ||
                      item.note.toLowerCase().includes(te)
                    );
                  });
                });
              }}
            />
          </div>
        </div>

        <div className="text-3xl gap-4 hidden md:flex">
          <a href="https://instagram.com/pranavshilavane">
            <AiFillInstagram />
          </a>
          <a href="https://instagram.com/pranavshilavane">
            <AiFillGithub />
          </a>
          <a href="https://instagram.com/pranavshilavane">
            <AiFillMail />
          </a>
        </div>
      </div>
    </>
  );
}
