const express = require('express')
const bodyParser = require('body-parser')
const Post = require('../models/post')
const mongoose = require('mongoose')
const router = express.Router();
router.post('',(req,res,next) => {
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
   router.put('/:id',(req,res,next) => {
      const post = new Post({
        _id:req.body.id,
        title: req.body.title,
        content: req.body.content
      });
      Post.updateOne({_id:req.body.id},post).then(result =>{
        return  res.status(200).json(
            {
                message:"Posts updated Successfully!",
                id:result._id
        });
      });
      
     })
  
  router.get('',(req,res,next) => {
    Post.find()
    .then(document =>{
      return  res.status(200).json(
          {
              message:"Posts Fetched Successfully!",
              posts:document
      });
    })
  
  })
  
  router.get('/:id',(req,res,next) => {
      Post.findById(req.params.id)
      .then(post =>{
        if(post){
          return  res.status(200).json(post);
        }else{
     return  res.status(404).json(
            {
                message:"Page not found!",
        });
        }
     
      })
    
    })
  router.delete("/:id",(req,res,next) => {
    
     Post.deleteOne({_id:req.params.id}).then(result => {
      return  res.status(200).json(
          {
              message:"deleted Successfully!",
      
          });
     })
     
     })
  
  module.exports = router;