const express = require('express');
const app = express();

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

app.post("/api/posts",(req,res,next)=>{
  const newPost = req.body
  res.status(201).json({
    message:'success'
    // post:newPost
  });
})

app.use((req,res,next)=>{
console.log("middleware--",apis);
next();
})

app.use('/api/post',(req,res)=>{
  const post = [{
  id : 1,
  title : 'Java',
  content : 'Programming Language'
  },
  {
  id : 2,
  title : 'HTML',
  content : 'Interpreted Language'
  }]
  res.status(200).json({
    message:"success",
    post:post});
  })

module.exports = app;
