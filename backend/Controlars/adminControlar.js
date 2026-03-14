const adminColl = require("../db/models/adminSchema.js")
var jwt = require('jsonwebtoken');

const PRIVET_KEY = process.env.PRIVET_KEY
const Controlars = {}

Controlars.adminLogin = async (req,resp)=>{
  try{
    console.log(req.body)
    const { username, password } = req.body
    if(!username || !password) throw Error("username or password not found.")
    
    const hashPassword = jwt.sign( password , PRIVET_KEY)
    
    // if not admin have then create one
    {
      const [admin] = await adminColl.find()
      if(!admin){
        const newAdmin = new adminColl({username,password:hashPassword})
        await newAdmin.save()
      }
    }
    
    const [admin] = await adminColl.find()
    if(!admin) throw Error("Server error!")
    
    const matched_username = admin.username === username
    const matched_password = admin.password === hashPassword
    if(!matched_password || !matched_username) throw Error("Invalid username or password")
    
    // all ok now 
    const token = jwt.sign( {username,password, tokenTime: Date.now()} , PRIVET_KEY)
    
    // save token 
    admin.token = token
    await admin.save()
    
    // remove password 
    admin.password = ""
    
    // send response
    resp.status(200).json({ admin })
    
  }catch(err){
    resp.status(500).json({message: err.message})
  }
}


module.exports = Controlars