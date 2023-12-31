const bcrypt = require('bcrypt');

const express = require('express');
const router = express.Router();

const { 
    signupUser, 
    loginUser, 
    resetPassword 
} =  require('../dbServices');

router.post('/signup', async (req, res) =>{
    const { email, username, password} = req.body;

    try{
        const hash = await bcrypt.hash(password, 10);
        const response = await signupUser(email, username, hash)
        response.insertId > 0 ? 
            res.status(200).send({success: true, id: response}) : 
            res.status(302).send({success: false, res: response})
    }catch(error){
        res.status(302).send({success: false, res: error})
    }
});

router.post('/login', async (req, res) =>{
    const { usernameEmail, password} = req.body;
    console.log(req.body);

    const {passwordHash} = await loginUser(usernameEmail)

    try {
        if(!passwordHash){
            res.status(302).send({success: false, msg: "Username or Email Unavailable"})
        }else{
            const match = await bcrypt.compare(password, passwordHash);
            if(match) {
                //login
                res.status(200).send({success: true, msg: "User Found"})
            }else{
                res.status(302).send({success: false, msg: "Incorrect Password"})
            }
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({success: false, msg: "Username or Password incorrect"})
    }

});

router.patch('/resetpassword', async(req, res) =>{
    const { email} = req.body;
    console.log(email);
    res.status(200).send({success: true})
    // try {
    //     const hash = await bcrypt.hash(password, 10);
    //     console.log("hash", hash)
    //     const response = await resetPassword(hash, username)
    //     res.status(200).send({success: true})
    // } catch (error) {
    //     console.log(error)
    // }
})

module.exports  = router