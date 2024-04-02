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
    last_name:'',
    email: '',
    phone:'',
    password: '',
    confirmPassword: '',
  });

  // const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
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
    if(resp.data.message === 'user added successfully'){
      Swal.fire("User added");
      navigate("/");
    }


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

    
    if (!/^[a-zA-Z]+$/.test(data.first_name) || data.first_name.trim() === '') {
      errors.firstName = '!. first Name should contain only letters and should not be empty';
    
    }
    if (!/^[a-zA-Z]+$/.test(data.last_name)  || data.last_name.trim() === '') {
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
    <div style={{backgroundColor:"#F3EDC8"}}>
    <div className="bg-cover w-screen h-screen bg-fixed bg-no-repeat scale-90 -mt-4 ml-56" style={{background:`url(${Book})`, backgroundSize:'70% auto', width:'100wh', height:'100vh',backgroundRepeat:'no-repeat'}}> 
    <div className="w-72 h-80 mt-44 rounded-lg justify-center items-center flex flex-col shadow duration-500 float-left [margin-left:195px] scale-110 font-bold text-2xl">
      <h2>Welcome to BookStack</h2>
    </div>
    <div className="w-72 [height:26rem] mt-36 rounded-lg justify-center items-center flex flex-col shadow duration-500 float-left [margin-left:150px] scale-110 p-4">
      <h2 className='font-bold text-xl text-red-500'>Profile Registration</h2>
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

        <button type="submit" className='bg-red-600 mt-4 w-28 text-white ml-10 rounded-sm p-1 scale-90 hover:bg-blue-400'>Register</button>
        <br/>
        <a href="/" className="inline-block text-gray-500 font-semibold py-2 px-4 rounded-lg  transition duration-300 ease-in-out transform hover:scale-105">Already Registered?</a>
        
      </form>
    </div>
    </div>
    </div>
  )
  
}

export default Register