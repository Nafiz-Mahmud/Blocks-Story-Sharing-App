import React, { useContext } from "react";
import "../styles/nav/style.css";
import { Link } from "react-router-dom";

import { UserContext } from "../App";

const Nav = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser((prev) => !prev);
  };

  //   return (
  //     <div className="nav">
  //       <div className="logo">
  //         <Link to="/">
  //           <h1>Blocks</h1>
  //         </Link>
  //       </div>
  //       <ul>
  //         <Link to="/">
  //           <li>Home</li>
  //         </Link>
  //         <Link to="add-story">
  //           <li>Add-Blog</li>
  //         </Link>
  //         <Link to="user">
  //           <li>Profile</li>
  //         </Link>

  //         <Link to="sign-up">
  //           <li>Signup</li>
  //         </Link>
  //         <Link to="login">
  //           <li>Login</li>
  //         </Link>
  //       </ul>
  //     </div>
  //   );
  // };

  return (
    <div className="nav">
      <div className="logo">
        <Link to="/">
          <h1>Blocks</h1>
        </Link>
      </div>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="add-story">
          <li>Add-Blog</li>
        </Link>
        {/* <Link to="user">
          <li>Profile</li>
        </Link> */}
        {!user ? null : (
          <Link to="user">
            <li>Profile</li>
          </Link>
        )}
        {!user && (
          <Link to="sign-up">
            <li>Signup</li>
          </Link>
        )}
        {user ? (
          <Link to="/">
            <li onClick={() => handleLogout()}>Logout</li>
          </Link>
        ) : (
          <Link to="login">
            <li>Login</li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Nav;
