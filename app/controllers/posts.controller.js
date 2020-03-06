const Post = require("../models/posts.model");

const create = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: "Post Title required" });
  }
  if (!req.body.slug) {
    return res.status(400).json({ message: "Post Slug required" });
  }
  if (!req.body.body) {
    return res.status(400).json({ message: "Post Body required" });
  }

  try{
    if(await Post.findOne({ slug: req.body.slug })){
      return res.status(400).json({ status: false,
        message: "Already registered with the Slug " + req.body.slug
      });
    } else {
      await createPost(req.body);
      res.status(200).send({ status: true, message: "Post created succesfully" });
    }
  } catch(err){
    return res.status(500).json({ status: false, message: "Something went wrong" });
  }
};


function createPost(details) {
  const post = new Post(details);
  post.save().catch(err => {
    throw err;
  });
}


const list = (req, res) => {
  Post.find()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(400).json({ message: "Something went wrong" });
    });
};

const findone = (req, res) => {
  var query = { slug: req.params.slug};
  Post.findOne(query)
    .then(data => {
      if (!data) {
        return res
          .status(404)
          .json({ message: "Post Not Found with ID " + req.params.postId });
      }
      return res.status(200).json([data]);
    })
    .catch(err => {
      return res.status(500).json({
        message: "Some thing went wrong with the ID " + req.params.postId
      });
    });
};

const update = (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ message: "Post Title required" });
      }
      if (!req.body.slug) {
        return res.status(400).json({ message: "Post Slug required" });
      }
      if (!req.body.body) {
        return res.status(400).json({ message: "Post Body required" });
      }

      

  Post.findByIdAndUpdate(
    req.params.postId,
    req.body,
    { new: true }
  )
    .then(data => {
      if (!data) {
        return res.status(404).json({
          message: "Post Not Found with the Update ID " + req.params.postId
        });
      }
      return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(500).json({
        message: "Some thing went wrong with the Update ID " + req.params.postId
      });
    });
};

const remove = (req, res) => {
  User.findByIdAndRemove(req.params.postId)
    .then(data => {
      if (!data) {
        return res.status(404).json({
          message: "Post Not Found with the Remove ID " + req.params.postId
        });
      }
      return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(500).json({
        message: "Some thing went wrong with the Remove ID " + req.params.postId
      });
    });
};

module.exports = {
  create,
  list,
  findone,
  update,
  remove
};
