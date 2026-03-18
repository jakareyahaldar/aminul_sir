const adminColl = require("../db/models/adminSchema.js")
const userColl = require("../db/models/userSchrma.js")
const bookColl = require("../db/models/bookSchema.js")
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



// Get admin 
Controlars.getAdmin = async (req,resp)=>{
  try{
    const id = req.params.id
    if(!id) throw Error("Id not Found.")
    
    const admin = await adminColl.findOne({_id:id})
    admin.password = ""
    
    resp.status(200).json({data:admin})
    
  }catch(err){
    resp.status(500).json({message: err.message})
  }
}

// Get all users 
Controlars.Users = async (req,resp)=>{
  try{
    const users = await userColl.find()
    resp.status(200).json({users})
  }catch(err){
    resp.status(500).json({ message: err.message })
  }
}



// Aprove Controlar 
Controlars.AproveChange = async (req,resp)=>{
  try{
    const { isAprove } = req.body
    const { id } = req.params
    if( !id || typeof(isAprove) !== "boolean" ) throw Error("Invalid Data error.")
    
    // find user
    const user = await userColl.findOne({_id:id})
    if(!user) throw Error("User Not found.")
    // update is aprove 
    user.isAprove = isAprove
    await user.save()
    
    resp.status(200).json({message:"ok"})
    
  }catch({message}) { resp.status(500).json({message}) }
}


// Add Book 
Controlars.addBook = async (req,resp)=>{
  try{
    const { body } = req 
    const book = new bookColl(body)
    await book.save()
    
    resp.status(200).json({message:"ok"})
    
  }catch(message){ resp.status(500).json({message}) }
}


// Get books
Controlars.getBooks = async (req,resp)=>{
  try{
    const data = await bookColl.find()
    resp.status(200).json({data})
  }catch(err){
    resp.status(500).json({message: err.message})
  }
}

// Update book 
Controlars.updateBooks = async (req,resp)=>{
  try{
    const {body} = req
    const save = await bookColl.findOneAndUpdate({_id:body._id},body)
    resp.status(200).json({message:"ok"})
  }catch({message}){resp.status(500).json({message})}
}


// Delete book 
Controlars.deleteBook = async (req,resp)=>{
  try{
    const { _id } = req.params
    await bookColl.findOneAndDelete({_id})
    resp.status(200).json({message:"ok"})
  }catch({message}){resp.status(500).json({message})}
}


module.exports = Controlars