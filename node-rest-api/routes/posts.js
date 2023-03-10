const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  gettimelinePosts,
  getUserPosts,
} = require("../controller/postController");
const router = express.Router();

router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id", getPost);
router.get("/profile/:username", getUserPosts);
router.get("/timeline/:userId", gettimelinePosts);
module.exports = router;
