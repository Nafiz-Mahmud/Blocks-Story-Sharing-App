import React, { useEffect, useState } from "react";
import "../styles/StoriesProfile/style.css";
import { Link } from "react-router-dom";
import axios from "axios";

//import Context
import { useContext } from "react";
import { UserContext } from "../App";

const StoriesProfile = () => {
  const [stories, setStories] = useState([]);
  const [date, setDate] = useState(null);
  const url = "http://localhost:5000/api/stories";

  //import value from context
  const { userName } = useContext(UserContext);
  const { proPic } = useContext(UserContext);
  const { userPosts } = useContext(UserContext);

  const getStories = async () => {
    const res = await axios.get(url);
    const data = res.data;
    setStories(data);
    console.log(data);
  };

  useEffect(() => getStories, []);

  if (stories.length > 0) {
    return (
      <div className="storiesProfile">
        <div className="stories">
          {stories.map((story) => {
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
  } else {
    return (
      <div className="loading">
        <h1>Loading</h1>
      </div>
    );
  }
};

export default StoriesProfile;

////extra
// {userName && (
//   <div className="profile">
//     {userName ? (
//       <img className="userImg" src={proPic} alt="" />
//     ) : (
//       <img
//         className="userImg"
//         src="https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png"
//         alt=""
//       />
//     )}
//     <h1 className="user">{userName}</h1>
//     {/* <h3 className="postNum"> {userPosts.length} Posts</h3> */}
//     <button className="darkMode">Dark Mode</button>
//   </div>
// )}
