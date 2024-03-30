import './Signup.css';
import React, { useState } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="input-container">
        <label htmlFor="firstname" className="label">Please Enter First Name:</label>
        <input
          type="text"
          id="username"
          name="firstname"
          value={formData.username}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label htmlFor="email" className="label">Please Enter Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label htmlFor="password" className="label">Please Enter Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>
      <button type="submit" className="submit-button">Sign Up</button>
    </form>
  );
};

export default SignupForm;
