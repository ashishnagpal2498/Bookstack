// Author - Yogish Honnadevipura Gopalakrishna
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { backend_url } from "../../util/config";

export function ResetPassword() {
    const navigate = useNavigate();
    const validateForm = (ps, ps2) => {
        const errors = {};
    
        if (!/^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\-]{8,}$/.test(ps)) {
          errors.password = 'Password does not match the format';
      
        }
    
        if (!/^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\-]{8,}$/.test(ps2)) {
          errors.password = 'Password does not match the format.';
          
        }
    
        return errors;
      };
    const handlereset = () => {
        let pass;
        let payload;
        const validationResults = validateForm(document.getElementById('New').value, document.getElementById('Retypenew').value);
        if (Object.keys(validationResults).length > 0) {
            const errorMessage = Object.values(validationResults).join('\n');
            Swal.fire(errorMessage);
            return;
          }
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

        axios.post(`${backend_url}/users/updatepassword`, payload)
            .then((resp) => {
                console.log(resp.data);
                if (resp.data.message === 'Password updated successfully') {
                    
                    navigate("/login");
                    Swal.fire('Password has been Reset');
                    
                } else {
                    Swal.fire('Error Occurred');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen -mt-8 bg-yellow-100 ">
                <div className="w-96 bg-white p-8 rounded-lg shadow-lg scale-110">
                    <h2 className="text-2xl mb-4">Reset Password</h2>
                    <input type="password" id="New" placeholder="New Password" className="w-full px-3 py-2 border border-gray-300 rounded mb-4" />
                    <input type="password" id="Retypenew" placeholder="Confirm Password" className="w-full px-3 py-2 border border-gray-300 rounded mb-4" />
                    <button onClick={handlereset} className="w-full shadow-lg [background-color:#c08a5f] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Reset Password</button>
                </div>
            </div>
        </>
    );
}
