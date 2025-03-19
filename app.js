require("dotenv").config()
const express = require("express"); //hold express variable
const connectDatabase = require("./database");
const Blog = require("./model/blogModel");
const app = express(); //create function
app.use(express.json());  // to run on json

connectDatabase()

//callback function
app.get("/",(req, res) => {
    res.send("welcome to homepage....");

});

app.get("/blog", (req, res) =>{  // creating get api
    res.status(200).json({
        msg : "This is BLog Page.."
    });
});

app.post("/blog", async (req, res) =>{ 
//    const faculty1 = req.body.faculty
//    const mentor1 = req.body.mentor
//    const course1 = req.body.course
const {faculty, course, mentor, image} = req.body; // de-structure
console.log(req.body);
await Blog.create({
    faculty : faculty,
    course : course,
    mentor : mentor,
    image : image
})
    res.status(200).json({
        msg : "Post API sucessfully"
    });
});

//3000 port number is given in listen method
app.listen(process.env.PORT, () => {
    console.log("Your nodejs project has been started....");
     
});

