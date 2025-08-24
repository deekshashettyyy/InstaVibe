let express = require("express");
let cors = require("cors");
let path = require("path");
let multer = require("multer");
let {MongoClient , ObjectId} = require("mongodb");
let fs = require("fs");

const url = "mongodb://0.0.0.0:27017";

let app = express();       //server obj
app.use(cors());           //permission
app.use(express.json());   //data parse 

app.use("/upload", express.static(path.join(__dirname, "uploadsFolder")));

let storage = multer.diskStorage(
    {
        destination: (req, file, cb)=> cb(null, "uploadsFolder/"),
        filename: (req, file, cb)=> cb(null, Date.now()+path.extname(file.originalname) )
    }
);

let obj = multer({storage});

// Mongodb
    let client = new MongoClient(url);   //creating connection
    client.connect();                    // connecting to mongo using url
    let db = client.db("insta");
    let collec = db.collection("posts");

// Routes 
app.post("/upload", obj.single("file") , (req,res)=>{

    let dataObj = {
        username: req.body.username,
        caption: req.body.caption,
        file_name: req.file.filename,
        file_url: `http://localhost:3000/upload/${req.file.filename}`,
        uploadTime: new Date()
    }

    //send to mongo
    collec.insertOne(dataObj)
    .then( (result)=> res.send(result) )
    .catch( (error)=> res.send(error));
});

app.get("/show" , (req,res)=>{

    collec.find().toArray()
    .then((result)=> res.json(result))
    .catch((err) => res.send(err));
});

app.delete("/delete/:id", (req,res)=>{

    const id = req.params.id; // string id
    let objID = new ObjectId(id); //converting string to obj

    collec.findOne({"_id": objID})
    .then((obj)=>{
        fs.promises.unlink(`uploadsFolder/${obj.file_name}`)   //delete from storage
        return collec.deleteOne({"_id": objID})                // delete from mongo
    })
    .then( (result) => res.send(result))
    .catch( (err) => res.send(err));


});



app.listen(3000, ()=>console.log("express is live"));


