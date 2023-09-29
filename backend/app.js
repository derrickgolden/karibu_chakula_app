
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');

const port = process.env.envPORT || 5003;

const auth = require("./routes/auth");
const meals = require("./routes/selectedMeals")
const accessToken = require("./routes/token")

const { sendEmailCode } = require('./controllers/sendEmail')
// sendEmailCode()

const app = express();
dotenv.config();

app.use(cors())
app.use(express.json())

app.use(express.static("dist"))
app.use('/token', accessToken);
app.use('/user', auth)
app.use('/selectedmeals', meals)

app.post('/send', (req, res) =>{
    console.log(req.body);
})

app.listen(port, 
    () => console.log(`listening ${port}`))
