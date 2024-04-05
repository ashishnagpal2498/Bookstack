// Author - Yogish Honnadevipura Gopalakrishna
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { backend_url } from "../../util/config";
import { localStorageUtil } from "../../util";

function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState();
  const [currentPicture, setCurrentPicture] = useState();
  const navigate = useNavigate();
  useEffect(() => {

    const payload = {
      email: localStorageUtil.getItem('user')?.email,
    };
    axios
      .post(`${backend_url}/users/getuserinfo`, payload)
      .then((response) => {
        //   console.log(response);
        setUser(response.data);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setPhone(response.data.phone);
        setCurrentPicture(response.data.picture);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, [currentPicture]);

  const handleEdit = () => {
    setEditing(true);
  };
  const validateForm = (first_name, last_name, phone) => {
    const errors = {};

    if (!/^[a-zA-Z]+$/.test(first_name) || first_name.trim() === "") {
      errors.firstName =
        "! first Name should contain only letters and should not be empty";
    }
    if (!/^[a-zA-Z]+$/.test(last_name) || last_name.trim() === "") {
      errors.lastName =
        "! last Name should contain only letters and should not be empty";
    }

    if (!/^\d{10}$/.test(phone) || phone.trim() === "") {
      errors.phone =
        "! phone number should contain 10 digits and should not be empty";
    }
    return errors;
  };
  const handleSave = () => {
    let validationErrors = validateForm(firstName, lastName, phone);
    if (Object.keys(validationErrors).length > 0) {
      const errorMessage = Object.values(validationErrors).join("\n");
      Swal.fire(errorMessage);
      return;
    }
    // const email = localStorage.getItem('email')
    const payload = {
        first_name : firstName,
        last_name : lastName,
        email : localStorageUtil.getItem('user')?.email,
        phone: phone
    }
    // Update user data
    axios
      .put(`${backend_url}/users/updateprofile`, payload)
      .then((response) => {
        setUser(response.data);
        setEditing(false);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  const handleUpload = async (e) => {
    if (!file) {
      alert("hi");
      return;
    }
    const formData = new FormData();
    formData.append("email", localStorageUtil.getItem('user')?.email);
    formData.append("picture", file);
    console.log(file);

    axios
      .post(`${backend_url}/users/updatepicture`, formData)
      .then((response) => {
        console.log(response);
        if (response.data.message === "Picture updated successfully") {
          setCurrentPicture(response.data.user.picture);
          // window.location.reload();
        }
      });
  };

  const handleDelete = async (e) => {
    const payload = {
        "email": localStorageUtil.getItem('user')?.email
    }
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
        axios.post(`${backend_url}/users/deleteuser`, payload).then((response) => {
            console.log(response.data);
            if(response.data.message === 'User deleted successfully'){
                navigate("/login")
            }
        })
    } else {
        return;
    }
};


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-full bg-aboutUsBrown p-4">
      <div className="bg-white p-6 rounded shadow-2xl container-small">
        <div className=" mb-4 gap-2 flex flex-col justify-center align-items-center">
          <h1 className="text-2xl font-bold text-brown-900">Your Profile</h1>
          <img
            src={currentPicture}
            alt="profile"
            className="rounded-full h-[100px] w-[100px]"
          />
          <input
            type="file"
            className="ml-14"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className=" rounded-lg shadow-md shadow-black text-white hover:scale-110 mt-2 [background-color:#b7723a] w-20"
            onClick={handleUpload}
          >
            {" "}
            Upload{" "}
          </button>
        </div>
        <hr className="border-t-2 border-gray-400" />
        <div className="ml-4">
          <div className="mb-4">
            <label className="block font-bold mb-2">First Name: </label>
            {editing ? (
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            ) : (
              <input
                type="text"
                disabled
                className="border border-gray-300 rounded-md p-2 w-full"
                value={user.first_name}
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Last Name: </label>
            {editing ? (
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            ) : (
              <input
                type="text"
                disabled
                className="border border-gray-300 rounded-md p-2 w-full"
                value={user.last_name}
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Email: </label>
            <input
              type="text"
              disabled
              className="border border-gray-300 rounded-md p-2 w-full"
              value={user.email}
            />
            {/* <span className="border border-gray-300 rounded-md p-2 w-full">hg15yogish@gmail.com</span> */}
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Phone: </label>
            {editing ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            ) : (
              <input
                type="text"
                disabled
                className="border border-gray-300 rounded-md p-2 w-full"
                value={user.phone}
              />
              //   <span className="border border-gray-300 rounded-md p-2 w-full">{phone}</span>
            )}
          </div>
        </div>
        <div>
          {editing ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-14"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded ml-14 w-20"
            >
              Edit
            </button>
          )}

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  rounded ml-14 w-20"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
