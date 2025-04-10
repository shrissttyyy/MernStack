require("dotenv").config()
const express = require("express"); //hold express variable
const connectDatabase = require("./database");
const Blog = require("./model/blogModel");
const fs = require("fs");

const { storage, multer } = require("./middleware/multerConfig");
const { Console } = require("console");
const upload = multer({storage: storage})

const app = express(); //create function
app.use(express.json());  // to run on json

connectDatabase()

//callback function
app.get("/",(req, res) => {
    res.send("welcome to homepage....");
});

app.post("/blog", upload.single ("image"), async (req, res) =>{ //api //middleware //functioncall
//    const faculty1 = req.body.faculty
//    const mentor1 = req.body.mentor
//    const course1 = req.body.course
const {faculty, course, mentor} = req.body;
const filename = req.file.filename;  // multi-part
console.log(req.body);
if(!faculty || !course || !mentor ) {
    return res.status(400).json({
        msg : "Sorry..!! Please enter complete datas...."
    })
}
await Blog.create({
    faculty : faculty,
    course : course,
    mentor : mentor,
    image : filename,
})
    res.status(200).json({
        msg : "Post API sucessfully"
    });
});


app.get("/blog", async (req, res) =>{
    const blogs = await Blog.find();  // creating get api
    res.status(200).json({
        msg : "Blog fetch successfully",
        data: blogs,
    });
});
//single get api
app.get("/blog/:id", async(req,res) => {
    //console.log("Single Blog Hitted Successfully....")
   // console.log(req.params.id);
   const {id} = req.params;
   const blog = await Blog.findById(id);
   
   if(!blog) 
    {
    return res.status(404).json({
        msg: "Pelease correct your id..."
    });
   }

   res.status(200).json({
    msg: "Single Blog fetch successfully",
    data: blog,
   });
});

//deleting api

app.delete("/blog/:id", async(req, res) => {
    const {id} = req.params
    //console.log(req.params.id);
    const blog =  await Blog.findById(id);
    const imageName = blog.image;
    
    fs.unlink(`storage/${imageName}`,(err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File deleted successfully..");
        }
    });

    await Blog.findByIdAndDelete(id);
    res.status(200).json({
        msg: "Blog deleted successfully..",
    });
});

app.use(express.static("./storage"));

//3000 port number is given in listen method
app.listen(process.env.PORT, () => {
    console.log("Your nodejs project has been started....");
     
});

