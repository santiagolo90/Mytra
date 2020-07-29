var express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');


//Para imagen local
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/assets/images/temp'),
})

const uploadImage = multer({
   storage,
   fileFilter: function (req, file, cb) {
       var filetypes = /jpeg|jpg|png|gif/;
       var mimetype = filetypes.test(file.mimetype);
       var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

       if (mimetype && extname) {
           return cb(null, true);
       }
       cb("Error: File upload only supports the following filetypes - " + filetypes);
   },
   limits: { fileSize: 1000000 }
}).single('imagen');

router.use((req, res,next) => {

    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.status(404).send(err);
        }
        next();
    });
})

module.exports = router;
