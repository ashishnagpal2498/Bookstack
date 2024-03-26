/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Book from '../../assets/Book.png';
import axios from 'axios';
import styles from '../../index';
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name:'',
    email: '',
    phone:'',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
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
      "first_name": formData.first_name,
      "last_name": formData.last_name,
      "email": formData.email,
      "password": formData.password,
      "phone": formData.phone
    }
    // const resp = await axios.post("http://localhost:3001/users/add", payload);
    // if(resp.data.message === 'user added successfully'){
    //   alert("User added");
    //   navigate("/");
    // }
    alert("User Registered Successfully")
    navigate("/");

    setFormData({
      first_name: '',
      last_name:'',
      email: '',
      phone:'',
      password: '',
      confirmPassword: '',
    });

  };

  const validateForm = (data) => {
    const errors = {};

    
    if (!/^[a-zA-Z]+$/.test(data.first_name)) {
      errors.firstName = 'Name should contain only letters.';
    
    }
    if (!/^[a-zA-Z]+$/.test(data.last_name)) {
      errors.firstName = 'Name should contain only letters.';
    
    }
    
    if (!/^\d{10}$/.test(data.phone)) {
      errors.firstName = 'phone should contain 10 digits.';
    
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid Email format.';
  
    }

    if (!/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{8,}$/.test(data.password)) {
      errors.password = 'Password should be at least 8 characters and accept alpha-numeric and special characters.';
      
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
      
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
      <h2 className='font-bold text-xl'>Profile Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label>First Name:</label> */}
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder='first Name' className='textbox' />
          {/* {errors.firstName && <span>{errors.firstName}</span>} */}
        </div>

        <div>
          {/* <label>First Name:</label> */}
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder='last Name' className='textbox' />
          {/* {errors.firstName && <span>{errors.firstName}</span>} */}
        </div>

        <div>
          {/* <label>Email:</label> */}
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' className='textbox' />
          {/* {errors.email && <span>{errors.email}</span>} */}
        </div>

        <div>
          {/* <label>First Name:</label> */}
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder='Phone Number' className='textbox' />
          {/* {errors.firstName && <span>{errors.firstName}</span>} */}
        </div>

        <div>
          {/* <label>Password:</label> */}
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' className='textbox' />
          {/* {errors.password && <span>{errors.password}</span>} */}
        </div>

        <div>
          {/* <label>Confirm Password:</label> */}
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder='Confirm Password' className='textbox' />
          {/* {errors.confirmPassword && <span>{errors.confirmPassword}</span>} */}
        </div>

        <button type="submit" className='bg-red-500 mt-4 ml-8 rounded-sm p-1 scale-90'>Register</button>
        <br/>
        <a href="/" className="text-blue-500 mt-4 ml-5 underline scale-20">Already Registered?</a>
        
      </form>
    </div>
    </div>
    </div>
  )
  
}

export default Register