const multer = require("multer");

const storage = multer.diskStorage({
    destination : function(req, file, cb) { //defining destination in post file
        cb(null, "./storage") //callback (error, success)

    },
    filename : function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname); // naming the file
    },

});

module.exports =  {
    storage,
    multer,
}