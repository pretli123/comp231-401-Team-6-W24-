import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const validateForm = () => {
    if (!email.trim()) {
      setError("Please enter your email");
      return false;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post('http://localhost:3001/app/login', {
        email,
        password
      });
      
      if (res.data.success) {
        navigate("/home", { state: { id: email } });
      } else {
        setError("Email or password is incorrect");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = "Log In";
  }, []);

  return (
    <div>
      <form className="login" onSubmit={handleSubmit}>
        <h3>Log in</h3>

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
        <button type="submit" className="btn btn-primary">Log In</button>
        {error && <p>{error}</p>}
      </form>

      <p>No account? <Link to="/signup">Sign up here</Link></p>
    </div>
  );
};

export default Login;
