import { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import ContactCard from "./components/ContactCard";
import { db } from "./firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { NavLink } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const [contact, setContact] = useState([]);
  const contactRef = collection(db, "contact");

  const getData = async () => {
    const res = await getDocs(contactRef);
    setData(() =>
      res.docs.map((doc) => new Object({ ...doc.data(), id: doc.id }))
    );
    setContact(() =>
      res.docs.map((doc) => new Object({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start bg-slate-800 h-[94vh] w-screen">
      <div className="flex flex-col items-center justify-center gap-3 mt-[80px] w-[330px]">
        <h1 className="font-semibold text-xl bg-white p-2 px-5 w-[100%] text-center tracking-widest rounded">
          Contact Book App
        </h1>

        <div className="my-2 flex justify-between items-center relative w-[100%] gap-2">
          <AiOutlineSearch className="absolute text-white text-2xl top-1.5 left-2" />
          <input
            className="pl-10 border-2 text-white border-slate-200 bg-transparent rounded p-1 w-full"
            type="text"
            placeholder="Search Contact"
            onChange={(e) => {
              if (e.target.value.trim() === "") setContact(data);
              else
                setContact(
                  data.filter((con) => {
                    return (
                      con.name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                      con.email
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                  })
                );
            }}
          />
          <NavLink to={"/addcontact"}>
            <AiOutlinePlus className="bg-white rounded-full text-4xl p-1 px-2" />
          </NavLink>
        </div>
        <h2 className="text-white text-2xl">Contacts</h2>
        {contact.length === 0 ? (
          <h2 className="text-2xl text-white">No contact present</h2>
        ) : (
          contact.map((doc) => (
            <ContactCard key={doc.id} {...{ ...doc, getData }} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
