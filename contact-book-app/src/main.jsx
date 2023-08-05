import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddContact from "./components/AddContact.jsx";
import EditContact from "./components/EditContact.jsx";
import ShowContact from "./components/ShowContact.jsx";
import Footer from "./components/Footer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/addcontact" element={<AddContact />} />
      <Route path="/editcontact/:id" element={<EditContact />} />
      <Route path="/showcontact/:id" element={<ShowContact />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
