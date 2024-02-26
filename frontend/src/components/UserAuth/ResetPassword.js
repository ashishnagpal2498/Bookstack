import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export function ResetPassword() {
    const handlereset = () => {
        let pass;
        let payload;
        console.log(document.getElementById('New').value);
        console.log(document.getElementById('Retypenew').value);
        if (document.getElementById('New').value === document.getElementById('Retypenew').value) {
            const searchParams = new URLSearchParams(window.location.search);
            const hashedEmail = searchParams.get('data');
            console.log(hashedEmail);
            pass = document.getElementById('New').value;
            payload = {
                email: hashedEmail,
                password: pass
            };
            console.log(payload);
        } else {
            Swal.fire('Please Retype the Password correctly');
        }

        // axios.post('http://localhost:3001/reset-password', payload)
        //     .then((resp) => {
        //         if (resp.data.message === 'Password updated successfully') {
        //             Swal.fire('Password has been Reset');
        //         } else {
        //             Swal.fire('Error Occurred');
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         Swal.fire('Please Retype the Password correctly');
        //     });
        alert("password updated successfully");
    };

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <div className="flex justify-center items-center h-screen">
                <div className="w-96 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl mb-4">Confirm Your New Password</h2>
                    <input type="password" id="New" placeholder="New Password" className="w-full px-3 py-2 border border-gray-300 rounded mb-4" />
                    <input type="password" id="Retypenew" placeholder="Retype the new Password" className="w-full px-3 py-2 border border-gray-300 rounded mb-4" />
                    <button onClick={handlereset} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Reset Password</button>
                </div>
            </div>
        </>
    );
}
