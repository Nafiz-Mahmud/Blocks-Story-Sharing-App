import "./styles/globalStyle/style.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import SingleStory from "./pages/SingleStory";
import AddStory from "./pages/AddStory";
import User from "./pages/User";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/404";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateStory from "./pages/UpdateStory";

//Context

import { createContext, useState } from "react";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [proPic, setProPic] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [userPosts, setUserPosts] = useState("");

  return (
    <UserContext.Provider
      value={{
        text: "Hello world",
        user: user,
        setUser: setUser,
        userName: userName,
        setUserName: setUserName,
        proPic: proPic,
        setProPic: setProPic,
        createdAt,
        setCreatedAt,
        userPosts,
        setUserPosts,
      }}
    >
      <div className="App">
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route path="/single-story/:id" element={<SingleStory />} />
            <Route path="/update-story/:id" element={<UpdateStory />} />

            <Route
              path="/add-story"
              element={user ? <AddStory /> : <SignUp />}
            />
            <Route path="/user" element={user ? <User /> : <SignUp />} />
            <Route path="/sign-up" element={user ? <Homepage /> : <SignUp />} />
            <Route path="/login" element={user ? <Homepage /> : <Login />} />

            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </UserContext.Provider>
  );
}

// export

export default App;
