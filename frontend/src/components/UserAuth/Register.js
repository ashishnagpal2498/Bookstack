// Author - Yogish Honnadevipura Gopalakrishna
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Book from '../../assets/Book.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { backend_url } from "../../util/config";
// import styles from '../../index';
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    console.log(formData);
    if (Object.keys(validationErrors).length > 0) {
      const errorMessage = Object.values(validationErrors).join('\n');
      Swal.fire(errorMessage);
      return;
    }

    const payload = {
      "first_name": formData.first_name,
      "last_name": formData.last_name,
      "email": formData.email,
      "picture": "https://source.unsplash.com/random/100x100/?person",
      "password": formData.password,
      "phone": formData.phone
    }
    const resp = await axios.post(`${backend_url}/users/create`, payload);
    if (resp.data.message === 'user added successfully') {
      Swal.fire("User added");
      navigate("/");
    }


    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    });

  };

  const validateForm = (data) => {
    const errors = {};


    if (!/^[a-zA-Z]+$/.test(data.first_name) || data.first_name.trim() === '') {
      errors.firstName = '!. first Name should contain only letters and should not be empty';

    }
    if (!/^[a-zA-Z]+$/.test(data.last_name) || data.last_name.trim() === '') {
      errors.lastName = '!. last Name should contain only letters and should not be empty';

    }

    if (!/^\d{10}$/.test(data.phone) || data.phone.trim() === '') {
      errors.phone = '!. phone number should contain 10 digits and should not be empty';

    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = '!. Invalid Email format.';

    }

    if (!/^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\-]{8,}$/.test(data.password) || data.password.trim() === '') {
      errors.password = '!.  Password should be at least 8 characters and accept alpha-numeric and special characters.';

    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = '!. Passwords do not match.';

    }

    return errors;
  };
  return (
    <div className="flex flex-column h-full bg-aboutUsBrown">
      <div className="w-full h-full flex justify-content-center align-items-center">
        <div className="relative w-full md:w-1/2 h-full flex justify-content-center align-items-center">
          <div className="w-full h-full flex justify-content-center align-items-center">
            <img src={Book} alt="Book" className="absolute w-full h-full object-cover" />
          </div>
          <div className="absolute left-0 w-1/2 h-full flex justify-content-center align-items-center">
            <div className="rounded-lg justify-center items-center flex flex-col shadow duration-500 float-left scale-110 font-bold text-sm  translate-x-5 lg:text-2xl lg:translate-x-10">
              <p>Welcome to BookStack</p>
            </div>
          </div>
          <div className="absolute right-0 w-1/2 h-full flex justify-content-center align-items-center">
            <div className="rounded justify-center items-center flex flex-col shadow float-left text-xs -translate-x-5 lg:text-xl lg:-translate-x-10">
              <p className="font-bold text-2xl">Profile Registration</p>
              <form onSubmit={handleSubmit}>
                <div>
                  <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder='First Name' className='mt-4 rounded-lg [padding:3px]' />
                </div>

                <div>
                  <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder='Last Name' className='mt-4 rounded-lg [padding:3px]' />
                </div>

                <div>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' className='mt-4 rounded-lg [padding:3px]' />
                </div>

                <div>
                  {/* <label>First Name:</label> */}
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder='Phone Number' className='mt-4 rounded-lg [padding:3px]' />
                  {/* {errors.firstName && <span>{errors.firstName}</span>} */}
                </div>

                <div>
                  {/* <label>Password:</label> */}
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' className='mt-4 rounded-lg [padding:3px]' />
                  {/* {errors.password && <span>{errors.password}</span>} */}
                </div>

                <div>
                  {/* <label>Confirm Password:</label> */}
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder='Confirm Password' className='mt-4 rounded-lg [padding:3px]' />
                  {/* {errors.confirmPassword && <span>{errors.confirmPassword}</span>} */}
                </div>

                <div className='flex flex-column align-items-center'>
                  <button type="submit" className='bg-red-600 mt-4 w-28 text-white rounded-sm p-1 scale-90 hover:bg-blue-400'>Register</button>
                  <a href="/login" className="">Already Registered?</a>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Register