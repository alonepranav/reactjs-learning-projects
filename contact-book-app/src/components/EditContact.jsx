import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { AiOutlineUpload } from "react-icons/ai";
import { db, storage } from "../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import photo from "../assets/user.png";

export default function EditContact() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({ name: "", email: "", phone: "" });

  const [img, setImg] = useState(null);
  const [imageO, setImageO] = useState(null);

  useEffect(() => {
    const getDataByID = async () => {
      try {
        const docRef = doc(db, "contact", id);
        const docSnap = await getDoc(docRef);
        setData(docSnap.data());
        setImg(docSnap.data().image);
      } catch (err) {
        navigate("/");
      }
    };
    getDataByID();
  }, []);

  const getUniqueImageId = () => {
    const str =
      "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    let id = "";
    for (let i = 0; i < 13; i++)
      id += str[Math.floor((Math.random() * 100) % str.length)];
    return id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const firebaseRef = collection(db, "contact");

    if (imageO === null) {
      const dataDoc = doc(db, "contact", id);
      await updateDoc(dataDoc, { ...data });
    } else {
      const imageId = getUniqueImageId();
      const storageRef = ref(
        storage,
        `/files/${data.imageId == null ? imageId : data.imageId}`
      );
      const res = await uploadBytes(storageRef, imageO);
      const url = await getDownloadURL(storageRef);
      if (url) {
        const dataDoc = doc(db, "contact", id);
        await updateDoc(dataDoc, {
          ...data,
          imageId: data.imageId == null ? imageId : data.imageId,
          image: url,
        });
      }

      setData({ name: "", email: "", phone: "" });
      setImg(null);
    }
    navigate("/");
  };

  return createPortal(
    <div className="absolute top-0 left-0 h-screen w-screen bg-sky-500 flex items-center justify-center">
      <div>
        <form
          className="bg-white shadow-lg shadow-slate-900 rounded h-auto w-[350px] p-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl py-3 font-semibold text-center">
            Edit Contact
          </h2>
          <div className="flex justify-center h-[100px] relative">
            <img
              src={img === null ? photo : img}
              className="rounded-full h-[120px] w-[120px]"
              alt=""
            />
          </div>

          <label
            className="self-center text-sm font-semibold mt-10 block border-slate-500 border-2 rounded p-1.5 w-[170px] m-auto"
            htmlFor="image"
          >
            <AiOutlineUpload className="inline-block text-xl" /> &nbsp;Select
            Profile Photo
          </label>

          <input
            className="hidden"
            type="file"
            accept="image/*"
            id="image"
            onChange={(e) => {
              setImageO(e.target.files[0]);
              const fr = new FileReader();
              fr.readAsDataURL(e.target.files[0]);
              fr.onload = () => {
                setImg(fr.result);
              };
            }}
          />

          <label
            className="text-sm font-semibold mb-1 mt-3 block"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="border-2 border-slate-300 block p-1.5 w-[100%] rounded"
            type="text"
            id="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Name"
            required
          />

          <label
            className="text-sm font-semibold mb-1 mt-4 block"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border-2 border-slate-300 block p-1.5 w-[100%] rounded"
            type="email"
            id="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />

          <label
            className="text-sm font-semibold mb-1 mt-4 block"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <input
            className="border-2 border-slate-300 block p-1.5 w-[100%] rounded"
            type="tel"
            id="phone"
            placeholder="Phone Number"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            required
          />

          <button
            type={loading ? "button" : "submit"}
            className="block p-1.5 w-[100%] rounded mt-4 bg-blue-950 text-white font-semibold tracking-widest"
          >
            {loading ? (
              <div
                className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Edit Contact"
            )}
          </button>
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
