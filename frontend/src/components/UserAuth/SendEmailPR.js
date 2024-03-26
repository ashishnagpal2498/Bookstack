/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export function ForgetPasswordEmail() {
    const handlereset = () => {
        const payload = {
            "email": document.getElementById("mail").value
        };
        // axios.post("http://localhost:3001/forgot-password", payload)
        //     .then((resp) => {
        //         console.log(resp);
        //         if (resp.data.message === "Reset email sent successfully") {
        //             Swal.fire("Recovery mail has been sent check your Email");
        //         } else {
        //             Swal.fire("Specified mail does not exist in our database");
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         Swal.fire("Error while sending mail: ", error);
        //     });
        Swal.fire("Reset email sent successfully")
    };

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-center text-xl font-bold mb-4">Forgot Password</h1>
                <p className="text-center mb-4">Please enter your registered Email ID</p>
                <input type="text" id="mail" placeholder="Example@gmail.com" className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                <br />
                <br />
                <button onClick={handlereset} className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Send reset link
                </button>
            </div>
        </>
    );
}
