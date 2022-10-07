const express = require('express');
const Post = require("../models/post");
const multer = require('multer');
const router = express.Router();

const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
  let error = new Error("invalid mime type");
  const isValid = MIME_TYPE[file.mimetype];
  if(isValid){
    error = null;
  }
    cb(error, "backend/images")
  },
  filename:(req, file, cb) => {
    const fileName = file.originalname.split(' ').join('_');
    const ext = MIME_TYPE[file.mimetype];
    cb(null,fileName+ '_' + Date.now() + '.' + ext);
  }
})



router.post("", multer(storage).single("image"), (req, res, next) => {
  // const newPost = req.body
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  newPost.save().then((createPost) => {
    res.status(201).json({
      message: "success",
      postId: createPost._id,
    });
  });
});

router.get("", (req, res, next) => {
  Post.find().then((data) => {
    // console.log("mongoDB",data)cle
    res.status(200).json({
      message: "success",
      post: data,
    });
  });
});

router.put("/:id", (req, res, next) => {
  const uPost = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, uPost).then((result) => {
    res.status(200).json({
      message: "post updated.!",
    });
  });
});

router.delete("/:id", (req, res, next) => {
  //  console.log(req.params.id)
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: "post deleted",
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "post not found.!" });
    }
  });
});

module.exports = router;
