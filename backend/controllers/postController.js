const express=require("express")

const Post=require("../models/postModel")

const router=express.Router()

const authhenticateUser=require("../middlewares/authMiddleware")

router.get('./',authhenticateUser,async(req,res)=>{
    try {
        const posts=await Post.find({user:req.userId});
        res.status(200).json(posts)
    } catch (error) {
        console.error('get posts error')
        res.status(500).json({message:"internal server error"})
    }
})


router.patch('./postId',authhenticateUser,async(req,res)=>{
    try {
        const{title,body,device}=req.body;
        const updatedPost=await Post.findByIdAndUpdate(
            req.params.postId,
            {title,body,device},
            {new:true}
        );
        res.status(200).json(updatedPost)
    } catch (error) {
        console.error('update post error',error)
        res.status(500).json({message:"internal server error"})
    }
})

//delete request

router.delete('./postId',authhenticateUser,async(req,res)=>{
    try {
        const{title,body,device}=req.body;
        const updatedPost=await Post.findByIdAndDelete(
            req.params.postId,
        );
        res.status(204).end()
    } catch (error) {
        console.error('delete post error',error)
        res.status(500).json({message:"internal server error"})
    }
})

module.exports=router