const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const usersRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const postsRoute = require("./routes/posts.js");

dotenv.config();
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("conected mongo db");
});
app.use("/images", express.static(path.join(__dirname, "public/images")));
//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.listen(8800, () => console.log("server is running...."));
