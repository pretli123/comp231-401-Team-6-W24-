import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import './login.css'


const Login = () => {

  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      await axios.post('http://localhost:3001/app/signup', {
        email,
        password
      })
      .then(res =>{
        if (res.data === "exist") {
          navigate("/home", { state: { id: email } });
      } else if (res.data === "not exist") {
          navigate("/home", { state: { id: email } });
          alert("You did not sign up");
      }
      })
      .catch(e =>{
        alert("Email or Password is incorrect")
        console.log(e);
      })
      
      }catch (e) {
    console.log(e);
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
        <button type="button" class="btn btn-primary"><a href="/LoginConfirm" className="nav-link">Log In</a></button>
        <br />
        <p>No account?</p>
        <p><a href="/signup" className="nav-link">Sign up here</a></p>

      </form>-
      <Link to="/signup" className="nav-link">Sign up here</Link>
    </div>
  );
};

export default Login;