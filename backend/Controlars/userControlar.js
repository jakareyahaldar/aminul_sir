const userColl = require("../db/models/userSchrma.js")
var jwt = require('jsonwebtoken');
const PRIVET_KEY = process.env.PRIVET_KEY
const Controlars = {}


// Signup a new user 
Controlars.signupUser = async (req,resp)=>{
  try{
    const {body} = req
    
    // empty alert and trim
    const fields = ["name", "username", "phone", "password"]
    fields.forEach((fild)=>{
      if(!body[fild]) throw Error("Please Enter "+fild)
      body[fild] = body[fild].trim()
    })
    
    const auth_token = jwt.sign( crypto.randomUUID() , PRIVET_KEY)
    const hash_pass = jwt.sign( body.password , PRIVET_KEY)
    const newuser = new userColl({ ...body, password: hash_pass, token: auth_token })
    const user = await newuser.save()
    
    // response  
    user.password = ""
    resp.status(200).json({user})
    
  }catch(error){
    resp.status(500).json({message: error.message})
  }
}

// Login user 
Controlars.loginUser = async (req,resp)=>{
  try{
    const fields = ["phone","password"]
    const { body } = req
    
    // check and filter data
    const data = {}
    fields.forEach((fild)=>{
      if( !body[fild] ) throw Error(fild+" Not Found")
      data[fild] = body[fild].trim()
    })
    
    const hash_pass = jwt.sign( data.password , PRIVET_KEY)
    const token = jwt.sign( crypto.randomUUID() , PRIVET_KEY)
    // find user 
    const user = await userColl.findOne({ phone: data.phone, password: hash_pass })
    if(!user) throw Error("Incurrect username or password.")
    
    // updte token
    user.token = token
    const updated_user = await user.save()
    
    // swnd response 
    updated_user.password = ""
    resp.status(200).json({ user: updated_user })
    
  }catch(err){
    resp.status(500).json({ message: err.message })
  }
}



// Get user 
Controlars.getUser = async (req,resp)=>{
  try{
    const id = req.params.id 
    if(!id) throw Error("Id not Found.")
    
    const user = await userColl.findOne({_id: id})
    user.password = ""
    
    resp.status(200).json({data: user})
    
  }catch(error){
    resp.status(500).json({message: error.message})
  }
}



module.exports = Controlars