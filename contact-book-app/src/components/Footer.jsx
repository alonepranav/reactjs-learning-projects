import React from "react";
import {
  AiFillInstagram,
  AiOutlineGithub,
  AiOutlineMail,
} from "react-icons/ai";

export default function Footer() {
  return (
    <div className="flex h-auto items-center justify-between px-1 md:px-10 py-3 w-screen bg-sky-400">
      <div className=" text-1xl">
        Developer [ <span className="font-semibold">Pranav</span> ]
      </div>
      <div className="flex items-center justify-center gap-5 ">
        <a href="https://www.instagram.com/pranavshilavane">
          <AiFillInstagram className="text-2xl" />
        </a>

        <a href="https://www.github.com/pranavshilavane">
          <AiOutlineGithub className="text-2xl" />
        </a>

        <a href="mailto:pranavshilavane1@gmail.com">
          <AiOutlineMail className="text-2xl" />
        </a>
      </div>
    </div>
  );
}
