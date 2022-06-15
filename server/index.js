const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

const storiesRoute = require("./routes/storiesRoute");
const userRoute = require("./routes/userRoute");

app.use("/api/stories", storiesRoute);
app.use("/api/user", userRoute);

mongoose
  .connect(process.env.MONGO_URI, { autoIndex: false })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `server is connected to DB & running on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
