import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

import "../styles/singleStyle/style.css";

const SingleStory = () => {
  const [story, setStory] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const { userName } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const url = `http://localhost:5000/api/stories/${id}`;

  const getStory = async () => {
    const res = await axios
      .get(url)
      .then((data) => {
        setStory(data.data);
        // console.log(data.data);
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = async () => {
    await axios
      .delete(url)
      .then(() => {
        setDeleteMessage("Story Deleted!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => getStory, []);

  if (story.length === 0) {
    return (
      <div className="loading">
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="single-story">
      <h1 className="title">{story.title} </h1>
      <div className="details">
        <h3 className="author">{story.author} </h3>
        {/* <h3 className="author">{userName} </h3> */}
        <h4 className="created">{story.createdAt} </h4>

        {story.author == userName && (
          <div>
            <Link to={`/update-story/${id}`}>
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>
            <i
              className="fa-solid fa-trash-can"
              onClick={() => handleDelete()}
            ></i>
            <hr />
            <h2>{deleteMessage} </h2>
          </div>
        )}

        <p className="info">{story.story}</p>
      </div>
    </div>
  );
};

export default SingleStory;
