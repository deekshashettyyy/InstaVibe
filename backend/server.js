require("dotenv").config();

let express = require("express");
let cors = require("cors");
let multer = require("multer");
let fs = require("fs");
let {MongoClient , ObjectId} = require("mongodb");
let cloudinary = require("cloudinary").v2;
let {CloudinaryStorage} = require("multer-storage-cloudinary");


let app = express();       //server obj
app.use(cors());           //permission
app.use(express.json());   //data parse 


//MongoDB host
const url = process.env.MONGO_URL ;

// Mongodb connect
    let client = new MongoClient(url);   //creating connection
    client.connect();                    // connecting to mongo using url
    let db = client.db("insta");
    let collec = db.collection("posts");


// Cloudinary 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage
let storage = new CloudinaryStorage({cloudinary});
let obj = multer({storage});


// CREATE POST
app.post("/upload", obj.single("file") , (req,res)=>{

    let dataObj = {
        username: req.body.username,
        caption: req.body.caption,
        file_name: req.file.filename,
        file_url: req.file.path ,
        uploadTime: new Date()
    }

    //send to mongo
    collec.insertOne(dataObj)
    .then( (result)=> res.send(result) )
    .catch( (error)=> res.send(error));
});


// FETCH POST
app.get("/show" , (req,res)=>{

    let username = req.query.username;
    let searchByUser = username? {username} : {} ;

    collec.find(searchByUser).toArray()
    .then((result)=> res.json(result))
    .catch((err) => res.send(err));
});


// DELETE POST
app.delete("/delete/:id", async (req,res)=>{
    try{
        const id = req.params.id; // string id
        let _id = new ObjectId(id); //converting string to obj

        const obj = await collec.findOne({_id}) ;
        if (!obj) 
        {
            return res.send("File not found");
        }
       
        await cloudinary.uploader.destroy(obj.file_name);   //delete from cloudinary

        const result = await collec.deleteOne({_id})    // delete from mongo
        res.send(result);

    }
    catch(err)
    {
        res.send(err);
    }
});

app.listen(3000, ()=>console.log("express is live"));

