const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 6000

const uri = process.env.ATLAS_URI
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true }).then((result)=>console.log(result)).catch((err)=>console.log)
const connection = mongoose.connection
connection.once('open',()=>{
    console.log("MongoDB connection successful!")
})

const usersRouter = require('./routes/users');
const interchangeRouter = require('./routes/interchange');
const quizRouter = require('./routes/quiz')

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/interchange', interchangeRouter);
app.use('/quiz', quizRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})