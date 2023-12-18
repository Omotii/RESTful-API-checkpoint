const express = require('express')
const UserModel = require('./models/User')

const router = express.Router()

//to return all users
router.get('/users', async (req, res) => {
    try {
        const allUser = await UserModel.find();
        res.send(allUser);
    }
    catch(error) {
        res.status(500)
        res.send({error: "Users not available"})
    }
})

//adding a new user to the database
router.post('/users', async (req, res) => {
    const newUser = new UserModel({
        name: req.body.name,
        age: req.body.number
    })
    try {
        await newUser.save()
        res.send(newUser)
    }
    catch(error) {
        res.status(400)
        res.send({error: error.message})
    }
})

//edit a user by ID but using the Patch rather than Put method
router.patch('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await UserModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
            
        }
    catch(error) {
        res.status(400)
        res.send({error : error.message})
    }
})

//remove a user by ID
router.delete('/users/:id', async (req, res) => {
    try { 
        await UserModel.findByIdAndDelete(req.params.id)
        res.send('successfully deleted')
    }
    catch(error) {
        res.status(404)
        res.send('user does not exist')
    }
})

//all routes are tested using postman and changes are reflected accordingly and also in Mongo Data Base

module.exports = router