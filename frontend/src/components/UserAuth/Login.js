/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Book from '../../assets/Book.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { backend_url } from "../../util/config";
function Login() {
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
    const resp  = await axios.post(`${backend_url}/users/login`, payload)
    console.log(resp);
    if(resp.data.message === "Login Successful"){
    localStorage.setItem('id', resp.data.user._id);
    localStorage.setItem('email', resp.data.user.email);
    localStorage.setItem('role', resp.data.user.role);
    // need to change the navigation based on the role.
    navigate("/profile");
    }
    else{
      Swal.fire(resp.data.message);
    }
    setFormData({
      email: '',
      password: '',
    });

  };

  const validateForm = (data) => {
    const errors = {};

    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = '!.Invalid Email format.';
  
    }

    if (!/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{8,}$/.test(data.password)) {
      errors.password = '!.Password does not match the format.';
      
    }

    return errors;
  };
  return (
    <div style={{backgroundColor:"#F3EDC8"}}>
    <div className="bg-cover w-screen h-screen bg-fixed bg-no-repeat scale-90 -mt-4 ml-56" style={{background:`url(${Book})`, backgroundSize:'75% auto', width:'100wh', height:'100vh',backgroundRepeat:'no-repeat'}}> 
    <div className="w-72 h-80 mt-44 rounded-lg justify-center items-center flex flex-col shadow duration-500 float-left [margin-left:195px] scale-110 font-bold text-2xl">
      <h2>Welcome to BookStack</h2>
    </div>
    <div className="w-72 [height:26rem] mt-36 rounded-lg justify-center items-center flex flex-col shadow duration-500 float-left [margin-left:150px] scale-110 ">
      <h2 className='font-bold text-xl'>Login</h2>
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

        <button type="submit" className='bg-red-500 mt-4 ml-12 rounded-sm p-1 scale-90'>Login</button>
        <br/>
        <a href="/register" className="text-blue-500 mt-4 ml-5 underline scale-20">Create Account?</a>
        <br/>
        <a href="/forgetps" className="text-blue-500 mt-4 ml-5 underline scale-20">Forgot Password?</a>
      </form>
    </div>
    </div>
    </div>
  )
}

export default Login