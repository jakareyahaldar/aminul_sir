require('dotenv').config()
var cors = require('cors')
const express = require("express")
const app = express()

const fileParser = require('express-multipart-file-parser')
 

const adminRouter = require("./Routers/adminRouter.js")
const userRouter = require("./Routers/userRouter.js")

// variables
const PORT = process.env.PORT || 4000


// database connect req 
require("./db/mongoose.con.js")

app.use(fileParser)
app.use(express.json())
app.use(cors())
// Routers  
app.use(adminRouter)
app.use(userRouter)



app.get("/",(req,resp)=>{
  resp.json({status: "alive"})
})
// Listener 
app.listen(PORT,()=> console.log("server_alive_at > http://localhost:"+PORT))