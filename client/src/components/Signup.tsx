import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const userData = {
        email: email,
        password: password,
        name: name,
      };

      const response = await axios.post(
        `http://localhost:5000/users/create`,
        userData
      );
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Email already in use");
    }
  };

  return (
    <div className="signup-page">
            <img src="/2.png" alt="icon" />

      <form className="signup">
        <div className="signupcontainer">
          <h1>Sign up</h1>
          <label>UserName</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

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
            <button onClick={handleSubmit}>Sign up</button>
          </div>
          <h5>
            already have an account <Link to="/users/login">sign in</Link>{" "}
          </h5>

          {error && <p className="error-message">{error}</p>}
        </div>
      </form>
      <div className="image"></div>
    </div>
  );
}

export default Signup;
