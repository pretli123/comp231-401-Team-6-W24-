import './Signup.css';
import React, { useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/app/signup', {
        email,
        password,
        
      });

      if (response.data === "exist") {
        alert("You already have an account");
      } else if (response.data === "not exist") {
        navigate("/", { state: { id: email } });
        alert("You created your account successfully");
      }

      console.log(response.data);
    } catch (error) {
      alert("You cannot Signup something went wrong");
      console.error(error);
    }





  };
  
  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  return (
    <div>
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign up</h3>

        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <br />
        <button type="submit" className="btn btn-primary">Sign Up</button>
        <br />
        <p>Have an account already?</p>
        <p><a href="/login" className="nav-link">Log in here</a></p>
      </form>
    </div>
  );
};

export default SignupForm;
