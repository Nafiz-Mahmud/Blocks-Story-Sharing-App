const router = require("express").Router();
const User = require("../models/User");
const Story = require("../models/Story");
const bcrypt = require("bcrypt");

//Registration
router.post("/register", async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    res.status(400).json("Email already exists.");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      dp: req.body.dp,
    });

    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
});
//Login
let userName;
let userPosts;
router.post("/login", async (req, res) => {
  const userInfo = await User.findOne({ email: req.body.email });

  if (userInfo) {
    const validPass = await bcrypt.compare(
      req.body.password,
      userInfo.password
    );
    if (!validPass) {
      res.status(400).json("Email or Password doesn't match!");
    } else {
      const { username, dp, email, createdAt, ...rest } = userInfo;
      // const userPosts = await Story.find({ author: username });

      res.status(200).json({ username, email, dp, createdAt, userPosts });
      userName = username;
    }
  } else {
    res.status(404).json("Email or Password doesn't match!");
  }
});

//UserPosts
router.get("/user-posts", async (req, res) => {
  const userPosts = await Story.find({ author: userName });
  res.status(200).json(userPosts);
});

module.exports = router;
