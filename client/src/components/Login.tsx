import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/login`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="login">
      <h3>Log in</h3>

      <label>Email: </label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password: </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button onClick={handleSubmit}>Log in</button>
    </form>
  );
}

export default Login;
