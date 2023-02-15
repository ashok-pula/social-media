const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  gettimelinePosts,
} = require("../controller/postController");
const router = express.Router();

router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id", getPost);
router.get("/timeline/all", gettimelinePosts);
module.exports = router;
