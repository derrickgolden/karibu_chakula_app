
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');

const port = process.env.envPORT || 5003;

const auth = require("./routes/auth");
const meals = require("./routes/selectedMeals")

const { sendEmail } = require('./controllers/sendEmail')

const app = express();
dotenv.config();

app.use(cors())
app.use(express.json())

app.use(express.static("dist"))
app.use('/user', auth)
app.use('/selectedmeals', meals)

// app.get('/', (req, res) =>{
//     res.send("Hello world");
// })

app.listen(port, 
    () => console.log(`listening ${port}`))
