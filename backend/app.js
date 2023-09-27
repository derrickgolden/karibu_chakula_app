
const bcrypt = require('bcrypt');

const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');

const { insertSelectedMeals, getSelectedMeals, 
        signupUser, loginUser, resetPassword } =  require('./dbServices');
const { sendEmail } = require('./controllers/sendEmail')

const app = express();
dotenv.config();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) =>{
    res.send("Hello world");
})
app.get('/selectedmeals/:id', async(req, res) =>{
    const {id} = req.params
    console.log(id)
    const response = await getSelectedMeals(id)
    res.send({success: true, data: response});
})

app.post('/signup', async (req, res) =>{
    const { email, username, password} = req.body;

    try{
        const hash = await bcrypt.hash(password, 10);
        const response = await signupUser(email, username, hash)
        response > 0 ? res.status(200).send({success: true, id: response}) : 
            res.status(302).send({success: false, res: response})
    }catch(error){
        res.status(302).send({success: false, res: error})
    }
})
app.post('/login', async (req, res) =>{
    const { usernameEmail, password} = req.body;
console.log(password);
    const {passwordHash} = await loginUser(usernameEmail)

    try {
        if(!passwordHash){
            res.status(302).send({success: false, msg: "User not found"})
        }else{
            const match = await bcrypt.compare(password, passwordHash);
            if(match) {
                //login
                res.status(200).send({success: true, msg: "User Found"})
            }else{
                res.status(302).send({success: false, msg: "User not found"})
                console.log("password did not match")
            }
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({success: false, msg: "Username or Password incorrect"})
    }

})

// sendEmail()
// .catch(console.error);


app.patch('/resetpassword', async(req, res) =>{
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

app.post('/selectedmeals', async (req, res) =>{
    const {date, meals} = req.body
    console.log(meals)
    const response = await insertSelectedMeals(date, meals)
    response.leg ? res.status(200).send({success: true, id: response}) : res.status(302).send({success: false})
    console.log("response", response);
})

app.listen(5004, () =>{
    console.log(`Listening to port ${process.env.envPORT}`)
})