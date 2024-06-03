"use client";

import { useState } from "react";

const Profile = () => {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [role, setRole] = useState("Staff");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [address, setAddress] = useState("123 Main St, City, Country");
  const [angency, setAgency] = useState("Thủ Đức");

  const handleEdit = (field) => {
    let newValue = prompt(`Enter new value for ${field}:`);
    if (newValue !== null && newValue !== "") {
      switch (field) {
        case "firstName":
          setFirstName(newValue);
          break;
        case "lastName":
          setLastName(newValue);
          break;
        case "role":
          setRole(newValue);
          break;
        case "email":
          setEmail(newValue);
          break;
        case "phone":
          setPhone(newValue);
          break;
        case "address":
          setAddress(newValue);
          break;
        case "angency":
          setAgency(newValue);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="flex justify-start items-center ">
      <div className="max-w-3xl w-full bg-white shadow-md rounded px-8 pt-6 pb-8 ">
        <div className="text-center">
          <img
            src="https://artlogic-res.cloudinary.com/w_1200,c_limit,f_auto,fl_lossy,q_auto/artlogicstorage/hofa/images/view/9186b61f2f0b26347335c6dd32d165ee.jpg"
            alt="Avatar"
            className="w-28 h-28 rounded-full mx-auto mb-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 w-[100px]">
            First Name:
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={firstName}
              readOnly
            />
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => handleEdit("firstName")}
            >
              Edit
            </button> */}
          </div>
        </div>
        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 w-[100px]">
            Last Name:
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={lastName}
              readOnly
            />
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => handleEdit("lastName")}
            >
              Edit
            </button> */}
          </div>
        </div>
        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 w-[100px]">
            Role:
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={role}
              readOnly
            />
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => handleEdit("role")}
            >
              Edit
            </button> */}
          </div>
        </div>
        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 w-[100px]">
            Email:
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              value={email}
              readOnly
            />
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => handleEdit("email")}
            >
              Edit
            </button> */}
          </div>
        </div>
        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 w-[100px]">
            Phone:
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={phone}
              readOnly
            />
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => handleEdit("phone")}
            >
              Edit
            </button> */}
          </div>
        </div>
        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 w-[100px]">
            Address:
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={address}
              readOnly
            />
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => handleEdit("address")}
            >
              Edit
            </button> */}
          </div>
        </div>
        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2 w-[100px]">
            Agency:
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={angency}
              readOnly
            />
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => handleEdit("angency")}
            >
              Edit
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
