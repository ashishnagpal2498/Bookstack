/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Book from '../../assets/Book.png';
import axios from 'axios';
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach(error => {
        window.alert(error);
      });
      return;
    }
    const payload = {
      "email": formData.email,
      "password": formData.password
    }
    // const resp  = await axios.post("http://localhost:3001/user/login", payload)
    // if(resp.data.message === "Login Successful"){
    //   // set cookies after discussion
    // alert("Login Successful");
    // navigate("/profile");
    // }
    // else{
    //   alert(resp.data.message);
    // }
    navigate("/profile");

    
    setFormData({
      email: '',
      password: '',
    });

  };

  const validateForm = (data) => {
    const errors = {};

    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid Email format.';
  
    }

    if (!/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{8,}$/.test(data.password)) {
      errors.password = 'Password should be at least 8 characters and accept alpha-numeric and special characters.';
      
    }

    return errors;
  };
  return (
    <div style={{backgroundColor:"#F3EDC8"}}>
    <div className="main" style={{background:`url(${Book})`, backgroundSize:'75% auto', width:'100wh', height:'100vh',backgroundRepeat:'no-repeat'}}> 
    <div className="Card-msg">
      <h2>Welcome to BookStack</h2>
    </div>
    <div className="Card-reg">
      <h2 className='font-bold text-xl'>Login</h2>
      <form onSubmit={handleSubmit}>

        <div>
          {/* <label>Email:</label> */}
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' className='textbox' />
          {/* {errors.email && <span>{errors.email}</span>} */}
        </div>

        <div>
          {/* <label>Password:</label> */}
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' className='textbox' />
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