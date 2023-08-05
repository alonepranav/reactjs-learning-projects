import React from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <>
      <div className="bg-black py-2 px-4">
        <h3 className="text-2xl font-semibold text-white capitalize">
          {location.pathname === "/" ? "Home" : location.pathname.slice(1)}
        </h3>
      </div>
    </>
  );
}
