const express=require("express")
const mongoose=require("mongoose")
const connect = require("./db")
const userController=require("./controllers/userController")
const postController=require("./controllers/postController")
require('dotenv').config()

const port=process.env.PORT||3000



const app=express()

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use('/users',userController)
// app.use('/posts',postController)




app.listen(port,async()=>{
   await connect()
    console.log('running on port 8080')
})
