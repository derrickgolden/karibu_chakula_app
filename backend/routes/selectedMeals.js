const express = require('express');
const router = express.Router()

const { 
    insertSelectedMeals, 
    getSelectedMeals, 
} =  require('../dbServices');

router.get('/:id', async(req, res) =>{
    const {id} = req.params
    console.log(id)
    const response = await getSelectedMeals(id)
    res.send({success: true, data: response});
})

router.post('/', async (req, res) =>{
    const {date, meals} = req.body
    console.log(meals)
    const response = await insertSelectedMeals(date, meals)
    response.leg ? 
        res.status(200).send({success: true, id: response}) : 
        res.status(302).send({success: false})
    console.log("response", response);
})

module.exports = router;
