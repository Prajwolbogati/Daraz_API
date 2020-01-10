const express = require('express');
const app = express();
const {mongoose} = require('./db/db');
const bodyParser = require('body-parser');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require("path");
const itemRouter=require('./routes/item');
const userRouter=require('./routes/user');

const port = 3000;
const saltRounds=10;
const jwtSecret = "0123456789abcdefghijklmnopqrstuvwxyz";

app.use('/upload',express.static(__dirname+'/upload/itemlist'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/item',itemRouter);
app.use(userRouter);
app.listen(port,()=>{
    console.log(`server is listening in port ${port}`);
});
