import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { AiOutlineUpload } from "react-icons/ai";
import { db, storage } from "../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import photo from "../assets/user.png";

export default function AddContact() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", phone: "" });
  const [image, setImage] = useState(null);
  const [imageO, setImageO] = useState(null);

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
    const imageId = getUniqueImageId();
    const storageRef = ref(storage, `/files/${imageId}`);

    if (image !== null) {
      const res = await uploadBytes(storageRef, imageO);
      const url = await getDownloadURL(storageRef);
      if (url) {
        await addDoc(firebaseRef, { ...data, imageId, image: url });
      }
    } else {
      await addDoc(firebaseRef, { ...data, imageId: null, image: null });
    }
    setImage(null);

    setData({ name: "", email: "", phone: "" });
    navigate("/");
  };

  return (
    <div className="h-[100vh] w-screen bg-sky-500 flex items-center justify-center">
      <div>
        <form
          className="bg-white shadow-lg shadow-slate-900 rounded h-auto w-[350px] p-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl py-3 font-semibold text-center">
            Add Contact
          </h2>
          <div className="flex justify-center h-[100px] relative">
            <img
              src={image === null ? photo : image}
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
                setImage(fr.result);
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
              "Add Contact"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
