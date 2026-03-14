require('dotenv').config()
var cors = require('cors')
const express = require("express")
const app = express()

const adminRouter = require("./Routers/adminRouter.js")

// variables
const PORT = process.env.PORT || 5000


// database connect req 
require("./db/mongoose.con.js")

app.use(express.json())
app.use(cors())

// Routers  
app.use(adminRouter)



app.get("/",(req,resp)=>{
  resp.json({status: "alive"})
})
// Listener 
app.listen(PORT,()=> console.log("server_alive_at > http://localhost:"+PORT))