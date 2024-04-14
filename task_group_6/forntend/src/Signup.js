import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';

function SignUp({signUpSuc, hideSignUp}) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3009/signup', formData);
      console.log('Server response:', response.data);
      console.log(response.status);
      if(response.status === 200){
        signUpSuc(true)
        hideSignUp(false)
      }
      
    } catch (error) {
      console.error('Error during signup:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <button type="submit">Sign Up now</button>
    </form>
  );
}

export default SignUp;
