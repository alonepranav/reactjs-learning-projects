import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./app/Home";
import Navbar from "./app/Navbar";
import Dashboard from "./app/Dashboard";
import About from "./app/About";
import AddUser from "./app/AddUser";
import EditUser from "./app/EditUser";
import UserDetails from "./app/UserDetails";
export const BACKEND =
  "https://user-management-system-pranav-backend.onrender.com";
// export const BACKEND = "http://localhost:8000";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="edituser/:_id" element={<EditUser />} />
            <Route path="user/:_id" element={<UserDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
