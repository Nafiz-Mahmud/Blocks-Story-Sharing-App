import React, { useState, useEffect } from "react";
import "../styles/userStyle/style.css";
import { Link, useParams } from "react-router-dom";

//import Context
import { useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";

const User = () => {
  //import value from context
  const { userName } = useContext(UserContext);
  const { proPic } = useContext(UserContext);
  const { createdAt } = useContext(UserContext);

  const { userPosts } = useContext(UserContext);

  const [userAllPost, setUserAllPost] = useState([]);

  const url = "http://localhost:5000/api/user/user-posts";

  const handleUserPosts = async () => {
    const res = await axios.get(url);
    const data = res.data;
    console.log(data);
    setUserAllPost(data);
  };

  // useEffect(() => getUserPosts, []);

  return (
    <div className="user">
      <div className="img-container">
        <img src={proPic} alt="profile image" />
      </div>

      <h1 className="user">{userName}</h1>

      <h3 className="created-user">Created At :- {createdAt.slice(0, 10)} </h3>
      {userAllPost.length > 0 && (
        <h4 className="story-count">{userAllPost.length} Stories</h4>
      )}
      <hr />
      <div className="story-btn">
        <button className="get-stories" onClick={() => handleUserPosts()}>
          Get all stories
        </button>
      </div>
      <div className="stories">
        {userAllPost.map((story) => {
          return (
            <div className="story" key={story._id}>
              <Link to={`/single-story/${story._id}`}>
                <h1 className="title">{story.title} </h1>
              </Link>
              <h3 className="author"> {story.author} </h3>
              <h4 className="created"> {story.createdAt.slice(0, 10)}</h4>
              <p className="info">
                {story.story.slice(0, 100)}
                <Link to="/single-story">
                  <span className="seeMore"> See more..</span>
                </Link>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default User;
