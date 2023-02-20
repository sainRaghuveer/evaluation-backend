const express = require("express");
const { postModel } = require("../models/posts.model");
const jwt = require('jsonwebtoken');

const postsRoute=express.Router();

postsRoute.get("/",async(req,res)=>{
    const posts=await postModel.find();
    res.send(posts);
});

postsRoute.post("/addpost",(req,res)=>{
    try{
        const post=req.body;
        const addPost=new postModel(post);
        addPost.save();
        res.send({"msg":"Post created"})
    }catch(error){
        res.send({"msg":error.message})
    }
});

postsRoute.get("/top",(req,res)=>{
    res.send("Posts")
});

postsRoute.post("/update/:id",async(req,res)=>{
    const id=req.params.id;
    const payload=req.body;
    try{
        await postModel.findByIdAndUpdate({_id:id},payload);
        res.send({"msg":"Post updated"})
    }catch(error){
        res.send({"msg":error.message})
    }
});

postsRoute.post("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        await postModel.findByIdAndDelete({_id:id});
        res.send({"msg":"Post updated"})
    }catch(error){
        res.send({"msg":error.message})
    }
})


module.exports={
    postsRoute
}

