const jwt = require('jsonwebtoken');
const express = require('express');
require("dotenv").config()

const router = express.Router();

router.post('/', async(req, res)  =>{
    const {username} = req.body;

    const accessToken = await jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)
    res.status(201).send(accessToken);
})

module.exports = router;