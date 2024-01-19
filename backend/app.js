const express = require('express')

const app = express();

// app.use((req,res,next)=>{
//     console.log('First Middleware')
//     next();
// }) 

app.use('/api/posts',(req,res,next) => {
   const posts = [
    {
        id: "fasd213123",
        title: "First server side response",
        content: "This is coming from the server"
    },
    {
        id: "fasd2sada13123",
        title: "Second server side response",
        content: "This is coming from the server"
    }
   ]
 return  res.status(200).json(
    {
        message:"Posts Fetched Successfully!",
        posts:posts
});
})

module.exports = app;