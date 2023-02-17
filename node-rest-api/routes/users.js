const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
  getFriends,
} = require("../controller/userController");

const router = express.Router();
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
// router.get("/:id", getUser);
router.get("/", getUser);
router.get("/friends/:id", getFriends);

router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);
module.exports = router;
