// Author - Yogish Honnadevipura Gopalakrishna
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { backend_url } from "../../util/config";
// import { localStorageUtil } from '../../util';

export function ForgetPasswordEmail() {
    const validateForm = (ps) => {
        const errors = {};

        if (!/\S+@\S+\.\S+/.test(ps)) {
            errors.emmail = 'email does not match the format';

        }
        return errors;
    };
    const handlereset = () => {
        const validationResults = validateForm(document.getElementById("mail").value)
        if (Object.keys(validationResults).length > 0) {
            const errorMessage = Object.values(validationResults).join('\n');
            Swal.fire(errorMessage);
            return;
        }
        const payload = {
            "email": document.getElementById("mail").value
        };
        axios.post(`${backend_url}/users/resetlink`, payload)
            .then((resp) => {
                console.log(resp);
                Swal.fire(resp.data.message);
            })
            .catch((error) => {
                console.log(error);
                Swal.fire("Error while sending mail: ", error);
            });
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
                <input type="text" id="mail" placeholder="Example@gmail.com" className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                <br />
                <br />
                <button onClick={handlereset} className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Send reset link
                </button>
            </div>
        </>
    );
}
