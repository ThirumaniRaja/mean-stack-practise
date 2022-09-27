const express = require('express');
const Post = require('./models/post');
const mongoose = require('mongoose');
const app = express();

// mongoose.connect("mongodb://localhost:27017").then(()=>{
mongoose.connect("mongodb+srv://Thiruzz:zOKs8lIx8518CEy4@cluster0.rff0uf8.mongodb.net/?retryWrites=true&w=majority").then(()=>{
console.log("connected");
}).catch((error)=>{
  console.log("error in connection",error);

})

require('dotenv/config');
const apis = process.env.API_URL;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,DELETE,UPDATE,PATCH,OPTIONS")
  next();
})

app.use((req,res,next)=>{
  console.log("middleware--",apis);
  next();
  })

app.post("/api/posts",(req,res,next)=>{
  // const newPost = req.body
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content
  })
  newPost.save();
  console.log("Post",newPost);
  res.status(201).json({
    message:'success'
    // post:newPost
  });
})



app.get('/api/posts',(req,res,next)=>{
  Post.find().then(data=>{
    // console.log("mongoDB",data)cle
    res.status(200).json({
      message:"success",
      post:data});
    })
})

app.delete('/api/posts/:id',(req,res,next)=>{
//  console.log(req.params.id)
 Post.deleteOne({_id: req.params.id}).then(result=>{
  res.status(200).json({
    message: "post deleted"
   })
 })

})


module.exports = app;
