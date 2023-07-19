import express from "express";
import * as dotennv from 'dotenv'
import { Configuration, OpenAIApi} from "openai";



dotennv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, 
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req,res)=>{
    res.status(200).json({ message: 'Hello from DALL-E!' });
})

router.route('/').post(async(req,res)=>{
    try{
        const { prompt } = req.body;
        //console.log(req.body);

        const aiResponce = await openai.createImage({
            prompt,
            n: 3,
            size: '1024x1024',
            response_format: 'b64_json',
        });
        
        const image = aiResponce.data.data[0].b64_json;
        // console.log(image);
       const image2 = aiResponce.data.data[1].b64_json;
       const image3 = aiResponce.data.data[2].b64_json;
    //    const image4 = aiResponce.data.data[3].b64_json;
        // const image3= aiResponce.data.data[3].b64_json;
        // const image4= aiResponce.data.data[4].b64_json;
        // const image5= aiResponce.data.data[5].b64_json;

        //.data[0].b64_json;
        //console.log(anotherImage);
        
        //console.log(image2);

        res.status(200).json({ photo: image,photo2:image2,photo3:image3});
    }catch(err){
        console.log(err);
        res.status(500).send(err)
        //?.response.data.error.message
    }
})

export default router;

