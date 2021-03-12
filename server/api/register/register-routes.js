const express = require('express');
const router = express.Router();
const controller = require("./register-controller");

router.route('/')
    .post(controller,(req,res)=> {
        console.log("NEW USER MAKE")
    });



module.exports = router;

