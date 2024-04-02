require('dotenv').config()
const express=require("express")

// NMRHWXLWGCH3VVP68RHADX15
const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/otpVerification').then(()=>{
    console.log("database is connected")
}).catch((err)=>{
console.log(err);
})

const app=express()
// cors Policy
const userRoute= require('./routes/userRoutes')
app.use('/api',userRoute)

const port =process.env.PORT| 3000

app.listen(port , ()=>{
    console.log("server is running on the port ",port)
});

