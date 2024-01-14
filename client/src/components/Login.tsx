import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userData = {
        email,
        password,
      };

      const response = await axios.post(
        "http://localhost:5000/users/login",
        userData
      );

      console.log("Login successful:", response.data);
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form className="login">
      <div className="logincontainer">
        <h1>Log in</h1>

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
        <div className="submit">
          <button onClick={handleSubmit}>Log in</button>
        </div>
      </div>
    </form>
  );
}

export default Login;
