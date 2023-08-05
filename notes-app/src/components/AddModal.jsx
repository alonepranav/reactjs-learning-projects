import axios from "axios";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { BACKEND } from "../App";

const AddModal = ({ setModal, getData }) => {
  const [text, setText] = useState({
    note: "",
    title: "",
  });

  const [color, setColor] = useState(null);

  const addNote = async () => {
    const date = new Date();
    const dat = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    try {
      const res = await axios.post(`${BACKEND}/addnote`, {
        color,
        ...text,
        date: `${dat}/${month}/${year}`,
      });
      if (res.data.success) {
        getData();
      }
    } catch (err) {
      console.log(err);
    }
    setModal({ add: false, edit: false });
  };

  return (
    <div className="flex justify-center z-30 items-center absolute min-h-screen w-screen bg-[rgba(0,0,0,0.5)]">
      <div
        className={`${
          color ? color : "bg-white"
        } w-full mx-3 md:w-1/3 p-5 rounded-md flex justify-between flex-col`}
      >
        <div className="">
          <div className="flex justify-between items-center ">
            <h4 className="text-2xl">Add note</h4>
            <div>
              {[
                "bg-emerald-200",
                "bg-gray-300",
                "bg-yellow-200",
                "bg-pink-200",
                "bg-blue-200",
                "bg-orange-200",
              ].map((col, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => setColor(col)}
                    className={`${col} ${
                      col === color ? "shadow-md" : ""
                    } shadow-black p-3 my-2 rounded-full mx-1 border border-black`}
                  ></button>
                );
              })}
            </div>
            <GrClose
              className="text-xl font-extrabold"
              onClick={() => setModal({ read: false, add: false, edit: false })}
            />
          </div>
          {/* <hr /> */}
          <input
            type="text"
            value={text.title}
            onChange={(e) => setText({ ...text, title: e.target.value })}
            placeholder="Title"
            className="text-2xl my-5 outline-none w-full"
          />
          <textarea
            className="border-2 border-slate-300 p-1 w-full outline-none rounded h-60"
            value={text.note}
            onChange={(e) => setText({ ...text, note: e.target.value })}
            placeholder="Note"
          ></textarea>
        </div>
        <div className="flex justify-end mt-7">
          <button
            className="bg-gray-300 tracking-widest text-xs py-2 px-4 shadow-lg shadow-blue-100 mx-2 rounded"
            onClick={() => setModal({ read: false, add: false, edit: false })}
          >
            CLOSE
          </button>
          <button
            className="bg-blue-500 text-white tracking-widest text-xs py-2 px-4 shadow-lg shadow-blue-100 mx-2 rounded"
            onClick={() => {
              if (text.note.trim()) {
                addNote();
              }
            }}
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
