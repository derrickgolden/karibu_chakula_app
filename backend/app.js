

const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');

const auth = require("./routes/auth");
const meals = require("./routes/meals")

const { sendEmail } = require('./controllers/sendEmail')

const app = express();
dotenv.config();

app.use(cors())
app.use(express.json())
app.use('/user', auth)
app.use('/selectedmeals', meals)

app.get('/', (req, res) =>{
    res.send("Hello world");
})

app.listen(5003, () =>{
    console.log(`Listening to port ${process.env.envPORT}`)
})