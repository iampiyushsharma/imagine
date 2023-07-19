import express from 'express';
import * as dotenv from 'dotenv'
import {v2 as cloudinary } from 'cloudinary'

import Post from '../mongodb/models/post.js'

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//get all post
router.route('/').get(async(req,res)=>{
    try {
        const posts = await Post.find({});
        //console.log("getting data");
        res.status(200).json({success: true, data: posts})
    } catch (error) {
        //console.log("unable to get the  data");
        res.status(500).json({success: false, message: error})
    }
})

//creat a post
router.route('/').post(async(req,res)=>{
    try {
        const {name, prompt, photo} = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost =  await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })
        //console.log("Posted on Mongo");
        res.status(200).json({ success: true, data: newPost});
    } catch (error) {
        //console.log("Unable to post on mongo");
        res.status(500).json({success: false, message: error})
    }
})

export default router;