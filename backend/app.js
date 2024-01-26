const express = require('express')
const bodyParser = require('body-parser')
const Post = require('./models/post')
const mongoose = require('mongoose')

const app = express();
mongoose.connect("mongodb+srv://asadk1660:SADApani123@cluster0.x2zgvuh.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to database!')
})
.catch(() => {
    console.log('Connection failed!')
})
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-with, Content-Type,Accept")
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS,PUT ")
    next();
}) 
app.post('/api/posts',(req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result =>{
    console.log(result)
    return  res.status(201).json(
        {
            message:"Posts added Successfully!",
            id:result._id
    });
  });
  
 })

app.get('/api/posts',(req,res,next) => {
  Post.find()
  .then(document =>{
    console.log(document);
    return  res.status(200).json(
        {
            message:"Posts Fetched Successfully!",
            posts:document
    });
  })

})
app.delete("/api/posts/:id",(req,res,next) => {
  
   Post.deleteOne({_id:req.params.id}).then(result => {
    console.log(result);
    return  res.status(200).json(
        {
            message:"deleted Successfully!",
    
        });
   })
   
   })

module.exports = app;