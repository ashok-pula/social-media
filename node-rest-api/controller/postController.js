const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    console.log(req.body);
    console.log(newPost);
    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("the post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("the post has been disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
const gettimelinePosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => Post.find({ userId: friendId }))
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserPosts = async (req, res) => {
  try {
    const currentUser = await User.findOne({ username: req.params.username });
    const userPosts = await Post.find({ userId: currentUser._id });

    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  gettimelinePosts,
  getUserPosts,
};
