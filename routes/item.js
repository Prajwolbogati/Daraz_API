const express = require('express');
const item = require('../models/item');
const multer=require('multer')
const path=require("path");
const router = express.Router();
const uploadRouter = express.Router();



//get all the items or items list
router.get('/list',(req,res)=>{
    item.find({}).then((itemList)=>{
        res.send(itemList);
    }).catch((e)=>{
        res.send(e);
    })
});

//path to store image
const storage = multer.diskStorage({
    destination: "./upload/itemlist",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});
//check file types
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};
const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});

// uploadRouter.route('/upload')
//     .post(upload.single('imageFile'), (req, res) => {
//         res.json(req.file);
//     });


//post items or items
router.post('/save',upload.single('itemImage'),(req,res)=>{
    let newitem = new item({
        itemName:req.body.itemName,
        Price:req.body.Price,
        itemImage:req.file.filename
    });
    newitem.save().then((itemDoc)=>{
        res.send(itemDoc);
    });
});

//get single items or items by id
router.patch('/item/:itemId',upload.single('itemImage'),(req, res) => {
    // We want to upload a image in a item specified by itemId
    item.findOne({
        _id: req.params.itemId
    }).then((item) => {
        if (item) {
            // item object with the specified conditions was found
            return true;
        }
        // else - the item object is undefined
        return false;
    }).then((canUploadImage) => {
        if (canUploadImage) {
            item.findOneAndUpdate({
                    _id: req.params.itemId
                }, {
                    $set: req.body
                }
            ).then(() => {
                res.send({ message: 'item updated successfully' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});

module.exports=router;
// module.exports=uploadRouter;