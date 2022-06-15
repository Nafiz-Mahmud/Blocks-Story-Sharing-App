import { useState } from "react";
import "../styles/LoginStyle/style.css";

import axios from "axios";
// import { useNavigate } from "react-router-dom";

//import Context
import { useContext } from "react";
import { UserContext } from "../App";

const Login = () => {
  //import value from context

  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const { setUserName } = useContext(UserContext);
  const { setProPic } = useContext(UserContext);
  const { setCreatedAt } = useContext(UserContext);
  const { setUserPosts } = useContext(UserContext);

  ///
  // const navigate = useNavigate();
  const [status, setStatus] = useState("Log In");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const url = "http://localhost:5000/api/user/login";

  const patterns = {
    email: /^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  };

  console.log(user);

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(url, {
        email: email,
        password: password,
      });
      const data = await res.data;
      console.log(data);
      setUser((prev) => !prev);
      setUserName(data.username);
      setProPic(data.dp);
      setCreatedAt(data.createdAt);
      setUserPosts(data.userPosts);
    } catch (error) {
      setEmailError(error.response.data);
    }
  };

  const validate = (field, regex) => {
    console.log(regex.test(field.value));

    if (regex.test(field.value)) {
      setEmail(field.value);
    } else {
      // setValidEmail("Please Enter a valid Email address.");
      console.log("hello");
    }
  };

  const handleKeyUp = (e) => {
    validate(e.target, patterns[e.target.attributes.name.value]);
  };

  return (
    <div className="login">
      <div className="login-modal">
        <h2>{user}</h2>
        <h2 className="title">{status} </h2>
        <form onSubmit={loginUser}>
          <div className="inputs">
            <h4>{emailError} </h4>
            <br />
            <h4>{validEmail} </h4>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onKeyUp={(e) => handleKeyUp(e)}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
