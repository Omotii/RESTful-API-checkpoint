require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const router = require('./serverRoutes')
const app = express();

//all routes are defined in the serverRoutes file hence it is imported here via the require method
//this is done to keep this server file cleaner 

mongoose.connect(process.env.MONGO_URI)
.then( () => {
    console.log('connected to database')
    app.use(express.json())
    app.use('/api', router)
    app.listen(4000, () => console.log('server is running'))
})
.catch( (err) => console.error(err));
