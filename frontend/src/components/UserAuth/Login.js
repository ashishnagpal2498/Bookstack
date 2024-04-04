// Author - Yogish Honnadevipura Gopalakrishna
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Book from '../../assets/Book.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { backend_url } from "../../util/config";
import { localStorageUtil } from '../../util';

function Login({ user, setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      // setErrors(validationErrors);
      const errorMessage = Object.values(validationErrors).join('\n');
      Swal.fire(errorMessage);
      return;
    }
    const payload = {
      "email": formData.email,
      "password": formData.password
    }
    console.log(payload);
    const resp = await axios.post(`${backend_url}/users/login`, payload)
    console.log(resp);
    if (resp.data.message === "Login Successful") {
      const newUser = { name: resp.data.user.first_name + ' ' + resp.data.user.last_name, email: resp.data.user.email, role: resp.data.user.role, user_id: resp.data.user._id };
      setUser(newUser);
      localStorageUtil.setItem('user', newUser);
      navigate("/");
    }
    else {
      Swal.fire(resp.data.message);
    }
    setFormData({
      email: '',
      password: '',
    });

  };

  const validateForm = (data) => {
    const errors = {};
    // eslint-disable-next-line
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = '!.Invalid Email format.';

    }
    // eslint-disable-next-line
    if (!/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{8,}$/.test(data.password)) {
      errors.password = '!.Password does not match the format.';

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
            <div className="rounded-lg justify-center items-center flex flex-col shadow duration-500 float-left text-sm  -translate-x-5 lg:text-2xl lg:-translate-x-10">
              <p className="font-bold text-2xl">Login</p>
              <form onSubmit={handleSubmit}>

                <div>
                  {/* <label>Email:</label> */}
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' className='mt-4 rounded-lg [padding:3px]' />
                  {/* {errors.email && <span>{errors.email}</span>} */}
                </div>

                <div>
                  {/* <label>Password:</label> */}
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' className='mt-4 rounded-lg [padding:3px]' />
                  {/* {errors.password && <span>{errors.password}</span>} */}
                </div>

                <div className='flex flex-column justify-center align-items-center mt-2'>
                  <button type="submit" className='bg-red-500 py-2 px-4 rounded scale-90'>Login</button>
                  <a href="/register" className="text-lg text-blue-500 underline ">Create Account?</a>
                  <a href="/forgetps" className="text-lg text-blue-500 underline ">Forgot Password?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login