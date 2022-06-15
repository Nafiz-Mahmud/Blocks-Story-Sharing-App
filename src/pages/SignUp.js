import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/singUpStyle/style.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState("Sign Up");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dp, setDp] = useState("");

  const url = "http://localhost:5000/api/user/register";

  const registerUser = async (e) => {
    e.preventDefault();
    await axios
      .post(url, {
        username: username,
        email: email,
        password: password,
        dp: dp,
      })
      .then((response) => {
        console.log(response);
        setStatus("Successfully Signed Up");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="sign-up">
      <div className="signup-modal">
        <form onSubmit={registerUser}>
          <h1 className="title">{status} </h1>
          <div className="inputs">
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Password (min 6 character) "
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Profile Picture Link (not required)"
              onChange={(e) => setDp(e.target.value)}
            />
          </div>
          <button className="sign" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
