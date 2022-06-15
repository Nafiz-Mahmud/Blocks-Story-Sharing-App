import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "../styles/addStoryStyle/style.css";
const AddBlog = () => {
  const [status, setStatus] = useState("Add A New Story");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [story, setStory] = useState("");
  const { userName } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/stories";
    await axios
      .post(url, {
        title: title,
        author: userName,
        story: story,
      })
      .then((response) => {
        console.log(response);
        setStatus("Story Added");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="add-story">
      <h1 className="heading"> {status} </h1>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <input
            type="text"
            className="title"
            placeholder=" Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          {/* <input
            type="text"
            className="author"
            placeholder=" Enter Your Name"
            onChange={(e) => setAuthor(e.target.value)}
          /> */}
          <textarea
            type="text"
            className="story"
            placeholder="Type Your Story Here"
            onChange={(e) => setStory(e.target.value)}
          />
        </div>
        <div className="submit-button">
          <button className="submit" type="submit">
            Submit Story
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
