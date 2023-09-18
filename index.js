//app create 
const express = require("express")
const app  = express()

//PORT findout
require("dotenv").config()
const PORT = process.env.PORT

//middleware add
app.use(express.json())
const fileupload = require("express-fileupload")
app.use(fileupload())

//db connection

//cloud connection

//api route mount 

//activate server