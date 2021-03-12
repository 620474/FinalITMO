const express = require('express');
const router = express.Router();
const controller = require("./user-controller");

router.route('/')
    .get(controller,(req,res)=>{
        res.send('get all users');
    })




module.exports = router;
