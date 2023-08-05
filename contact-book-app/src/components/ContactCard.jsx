import { deleteDoc, doc } from "firebase/firestore";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import photo from "../assets/user.png";

export default function ContactCard({
  name,
  phone,
  email,
  image,
  id,
  getData,
}) {
  const deleteDocument = async () => {
    const dataDoc = doc(db, "contact", id);
    const res = await deleteDoc(dataDoc);
    getData();
  };

  return (
    <div className=" h-[55px] flex justify-between gap-5 items-center w-[100%] bg-white rounded p-1 px-2">
      <img
        src={image || photo}
        alt="User Profile Pic"
        className="h-10 rounded-full w-10"
      />
      <div className="flex-1">
        <Link className="w-[100%]" to={`/showcontact/${id}`}>
          <h3 className="">{name}</h3>
          <p className="text-xs">{email}</p>
        </Link>
      </div>
      <div className="flex gap-2 text-2xl">
        <NavLink to={`/editcontact/${id}`}>
          <AiFillEdit />
        </NavLink>
        <AiFillDelete onClick={deleteDocument} />
      </div>
    </div>
  );
}
