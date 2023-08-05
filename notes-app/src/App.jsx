import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { HiPencil, HiPlus } from "react-icons/hi";
import axios from "axios";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
import { createPortal } from "react-dom";
import ReadingPopUp from "./components/ReadingPopUp";
// export const BACKEND = "https://notify-backend-zeta.vercel.app";
export const BACKEND = "http://localhost:8000";

function App() {
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState([]);
  const [dataF, setFData] = useState([]);
  const [id, setId] = useState("");
  const [modal, setModal] = useState({
    add: false,
    edit: false,
    read: false,
  });

  const getData = async () => {
    try {
      const res = await axios.get(`${BACKEND}/getnotes`);
      if (res.data.success) {
        setData(res.data.data);
        setFData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const Box = ({ note, date, color, title, _id }) => {
    const [mod, setMod] = useState(false);

    return (
      <>
        {createPortal(
          <>
            {!mod || (
              <ReadingPopUp
                id="pop"
                {...{ note, date, color, title, _id, setMod }}
              />
            )}
          </>,
          document.getElementById("portal")
        )}
        <div
          className={`${color} border-[1px] border-black inline-block h-fit md:h-56 w-full md:w-56 rounded-xl p-3`}
          onClick={() => setMod(true)}
        >
          <div className="h-full w-full flex flex-col justify-between">
            <div>
              <h5 className="text-lg font-semibold">{title}</h5>
              <p className="line-clamp-6">{note}</p>
            </div>
            <div className="flex items-center justify-between h-10 ">
              <span className="text-sm tracking-wider font-semibold ">
                {date}
              </span>

              <a href="#edit">
                <button
                  className="bg-black rounded-full p-2"
                  onClick={() => {
                    setId(_id);
                    setModal({ read: false, add: false, edit: true });
                  }}
                >
                  <HiPencil className="text-white text-base" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {createPortal(
        <>
          {!modal.add || <AddModal {...{ setModal, getData }} />}
          {!modal.edit || <EditModal {...{ data, id, getData, setModal }} />}
          {!modal.read || <ReadingPopUp {...{ data, setModal }} />}
        </>,
        document.getElementById("portal")
      )}

      <div className="min-h-screen w-screen">
        <Navbar {...{ setModal, setId, setFData, data }} />
        <div className="flex w-full h-full">
          <div className="w-28 h-full hidden md:block">
            <button
              className="bg-black rounded-full block p-2 mx-auto mt-10"
              onClick={() => setModal({ read: false, add: true, edit: false })}
            >
              <HiPlus className="text-white text-xl" />
            </button>
            <div
              className={`${
                display ? "h-72 pt-5" : "h-0"
              } overflow-hidden transition-all flex justify-center items-center flex-col `}
            ></div>
          </div>
          <div className="bg-gray-20 w-full">
            <div className="mt-10">
              <div className="font-semibold text-3xl px-3 inline-flex justify-between w-full">
                <span>Notes</span>
                <button
                  className="bg-black rounded-full md:hidden p-2"
                  onClick={() =>
                    setModal({ read: false, add: true, edit: false })
                  }
                >
                  <HiPlus className="text-white text-xl" />
                </button>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap p-3 gap-5 md:gap-8">
              {!dataF.length ? (
                <span className="text-xl">No matching notes</span>
              ) : (
                dataF.map((text, i) => <Box key={i} {...text} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
