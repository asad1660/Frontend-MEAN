const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require('mongoose');

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect("mongodb+srv://asadk1660:SADApani123@cluster0.x2zgvuh.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to database!')
})
.catch(() => {
    console.log('Connection failed!')
})
app.use(bodyParser.json());
app.use (bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join("backend/images")));


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-with, Content-Type,Accept")
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS,PUT ")
    next();
}) 

app.use("/api/posts",postRoutes);
app.use("/api/user",userRoutes);
module.exports = app;