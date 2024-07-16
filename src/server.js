const express=require('express')
const indexRouter=require('./router')
const mongoose = require('mongoose')


const app=express()
const ulri='mongodb+srv://abhishekyadavfeb1498:pZmiwgII4dEqLlyY@keyoriginpassword.8nqivwy.mongodb.net/?retryWrites=true&w=majority&appName=keyOriginPassword'

mongoose.connect(ulri, {
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('Database connection successfull'))
.catch((err) => console.log('error in db connection', err));

const port=process.env.PORT||3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/',indexRouter)

app.listen(port,()=>{
    "Server is running on" + port
})