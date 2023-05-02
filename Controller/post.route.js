const express = require("express");
const {postModel} = require("../Model/postModel");
const { userModel } = require("../Model/userModel");


const postRouter = express.Router();


postRouter.get("/",async(req,res)=>{
 const name = req.body.name
 const {deviceName} = req.query;
 console.log(name)

    try {

        const posts = await postModel.find({name},{device:deviceName})
        res.send(posts)
        
    } catch (error) {
        res.send({"err":error})
    }
})

postRouter.post("/create",async(req,res)=>{
    try {
         const data = req.body
        const post = new postModel(data);
        await post.save();
        res.send({"msg":"post has been created","req":req.body})
        
    } catch (error) {
        res.send({"err":error.message})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    try {

        const {id} = req.params;
        console.log(id)
        const name = req.body.name
        
    const user = await postModel.findById({_id:id})
    
  console.log(user)
        if(user.name === name)
        {
            await userModel.findByIdAndUpdate(id,req.body)
            res.send("success")
        }
        else
        {
            res.send("error")
        }
        
    } catch (error) {
        res.send("error")
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const name = req.body.name;

        const post = await postModel.findById({_id:id})

        if(post.name === name)
        {
            await userModel.findByIdAndDelete({_id:id})
            res.send("success")
        }
        
    } catch (error) {

        res.send("error")
        
    }
})

module.exports = {
    postRouter
}
