/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    // const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [firstName, setFirstName] = useState('Yogish');
    const [lastName, setLastName] = useState('hg');
    const [phone, setPhone] = useState('1234567890');

    useEffect(() => {
        // Fetch user data
        const payload = {
          "email": "hg15yogish@gmail.com"
        }
        // axios.post('http://localhost:3001/user/profile/data', payload)
        //     .then(response => {
        //       console.log(response);
        //         setUser(response.data);
        //         setFirstName(response.data.first_name);
        //         setLastName(response.data.last_name);
        //         setPhone(response.data.phone);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //         // Handle error
        //     });
    }, []);

    const handleEdit = () => {
        setEditing(true);
    };

    // const handleSave = () => {
    //     // Update user data
    //     axios.put('/api/users/profile', { firstName, lastName, phone })
    //         .then(response => {
    //             setUser(response.data);
    //             setEditing(false);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             // Handle error
    //         });
    // };

    // if (!user) {
    //     return <div>Loading...</div>;
    // }

    return (
      <div className="flex justify-center items-center h-screen bg-yellow-100">
          <div className="bg-white p-6 rounded shadow-2xl w-96">
              <h1 className="text-2xl font-bold mb-4 text-brown-900 ml-24">User Profile</h1>
              <hr className='border-t-2 border-gray-400'/>
              <div className="mb-4">
                  <label className="block font-bold mb-2">First Name: </label>
                  {editing ? (
                      <input
                          type="text"
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          className="border border-gray-300 rounded-md p-2 w-full"
                      />
                  ) : (
                      // <span className="border border-gray-300 rounded-md p-2 w-full">{user.first_name}</span>
                      <span className="border border-gray-300 rounded-md p-2 w-full">{firstName}</span>
                  )}
              </div>
              <div className="mb-4">
                  <label className="block font-bold mb-2">Last Name: </label>
                  {editing ? (
                      <input
                          type="text"
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          className="border border-gray-300 rounded-md p-2 w-full"
                      />
                  ) : (
                      // <span className="border border-gray-300 rounded-md p-2 w-full">{user.last_name}</span>
                      <span className="border border-gray-300 rounded-md p-2 w-full">{lastName}</span>
                  )}
              </div>
              <div className="mb-4">
                  <label className="block font-bold mb-2">Email: </label>
                  {/* <span className="border border-gray-300 rounded-md p-2 w-full">{user.email}</span> */}
                  <span className="border border-gray-300 rounded-md p-2 w-full">hg15yogish@gmail.com</span>
              </div>
              <div className="mb-4">
                  <label className="block font-bold mb-2">Phone: </label>
                  {editing ? (
                      <input
                          type="text"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="border border-gray-300 rounded-md p-2 w-full"
                      />
                  ) : (
                      // <span className="border border-gray-300 rounded-md p-2 w-full">{user.phone}</span>
                      <span className="border border-gray-300 rounded-md p-2 w-full">{phone}</span>
                  )}
              </div>
              {editing ? (
                  // <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-14">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-14">
                      Save
                  </button>
              ) : (
                  <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-14">
                      Edit
                  </button>
              )}
              <button className="bg-blue-500 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded ml-4">
                      Delete Account
                  </button>
          </div>
      </div>
  );
    
  
}

export default Profile;

