import React from "react";
import { AiFillGithub, AiFillInstagram, AiFillMail } from "react-icons/ai";
import { HiOutlineArrowLeft } from "react-icons/hi";

export default function ReadingPopUp({ note, color, title, setMod }) {
  return (
    <>
      <div
        className={`h-[300vh] w-screen absolute top-0 z-10 p-3 ${
          color || "bg-white"
        }`}
      >
        <div className="">
          <div className="mb-7 flex justify-between items-center">
            <HiOutlineArrowLeft
              className="text-2xl"
              onClick={() => setMod(false)}
            />

            <div className="text-3xl gap-4  flex">
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
          <h4 className="text-3xl mb-5">{title}</h4>
          <p className="text-xl">{note}</p>
        </div>
      </div>
    </>
  );
}
