import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { BACKEND } from "../App";

const EditModal = ({ data, id, getData, setModal }) => {
  const [text, setText] = useState({
    color: "",
    title: "",
    note: "",
    date: "",
    _id: "",
  });

  useEffect(() => {
    const info = data.find((n) => n._id === id);
    setText({ ...info });
  }, []);

  const deleteNote = async () => {
    try {
      const res = await axios.post(`${BACKEND}/deletenote`, {
        _id: id,
      });
      console.log(res);
      getData();
    } catch (err) {
      console.log(err);
    }
    setModal({ add: false, edit: false });
  };

  const editNote = async ({ _id }) => {
    const date = new Date();
    const dat = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    try {
      const res = await axios.post(`${BACKEND}/editnote`, {
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
    <div
      className="flex justify-center z-30 items-center absolute h-screen w-screen bg-[rgba(0,0,0,0.5)]"
      id="edit"
    >
      <div
        className={`bg-white w-full md:w-1/3 p-3 mx-3 rounded-md flex justify-between flex-col`}
      >
        <div className="">
          <div className="flex justify-between items-center ">
            <h4 className="text-2xl">Edit note</h4>
            <div className="flex gap-3 text-xl">
              <AiFillDelete onClick={() => deleteNote()} />
              <GrClose onClick={() => setModal(false)} />
            </div>
          </div>
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
            onClick={() => setModal(false)}
          >
            CLOSE
          </button>
          <button
            className="bg-blue-500 text-white tracking-widest text-xs py-2 px-4 shadow-lg shadow-blue-100 mx-2 rounded"
            onClick={() => {
              editNote({ _id: text._id });
            }}
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
