require('dotenv').config()
const express = require("express")
const app = express()
// variables
const PORT = process.env.PORT || 5000


// database connect req 
require("./db/mongoose.con.js")


// Listener 
app.listen(PORT,()=> console.log("server_alive_at > http://localhost:"+PORT))