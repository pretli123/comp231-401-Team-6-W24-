// LoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios'
import SignUp from './Signup';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignUpSuc, setIsSignUpSuc] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In a real app, verify credentials against a secure backend.
    // Here, we'll simply check if the username and password are not empty.
    try {
      // Replace the URL with your actual server URL
      const response = await axios.post('http://localhost:3009/login', { username, password });
      const {token} = response.data;
      if(token){
        localStorage.setItem('authToken',token);
        onLogin(username,token); // Proceed to log the user in on the client side
      }else{
        alert('Login failed. Please check your credentials.');
      }
      
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  }

  return (
    <div>
     
       
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
        <hr/>

        <button onClick={()=>{setIsSignUp(!isSignUp)}}>Sign Up</button>

        {isSignUp && (<SignUp signUpSuc={setIsSignUpSuc}  hideSignUp={setIsSignUp}/>)}
        
      
       <br/>
      {isSignUpSuc && <h2>Sign Up Successfully, please login</h2>}
    </div>
    
  );
};

export default LoginForm;
