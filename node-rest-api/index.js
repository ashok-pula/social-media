const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const usersRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const postsRoute = require("./routes/posts.js");

dotenv.config();
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("conected mongo db");
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.listen(8800, () => console.log("server is running...."));
