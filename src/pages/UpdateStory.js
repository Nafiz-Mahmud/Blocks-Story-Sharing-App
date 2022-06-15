import "../styles/updateStory/updateStory.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";

const UpdateStory = () => {
  const { id } = useParams();

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateAuthor, setUpdateAuthor] = useState("");
  const [updateStory, setUpdateStory] = useState("");
  const { userName } = useContext(UserContext);
  const url = `http://localhost:5000/api/stories/${id}`;
  const getStory = async () => {
    const res = await axios
      .get(url)
      .then((res) => {
        setUpdateTitle(res.data.title);
        setUpdateAuthor(res.data.author);
        setUpdateStory(res.data.story);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateStory = async (e) => {
    e.preventDefault();
    try {
      const updatedSingleStory = await axios
        .put(url, {
          title: updateTitle,
          author: userName,
          story: updateStory,
        })
        .then(() => console.log("post update request send"));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => getStory, []);
  return (
    <div className="update-story">
      <h1 className="update-title">Update Story</h1>
      <form onSubmit={handleUpdateStory}>
        <div className="inputs">
          <div className="title">
            <h3>Update Title</h3>
            <input
              type="text"
              className="update post title"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
          </div>
          {/* <div className="title">
            <h3>Update Author</h3>
            <input
              type="text"
              className="update post title"
              value={updateAuthor}
              onChange={(e) => setUpdateAuthor(e.target.value)}
            />
          </div> */}
          <div className="title">
            <h3>Update Story</h3>
            <textarea
              type="text"
              className="update post title"
              value={updateStory}
              onChange={(e) => setUpdateStory(e.target.value)}
            />
          </div>
        </div>
        <div className="button">
          <button className="update-button" type="submit">
            Update Story
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStory;
