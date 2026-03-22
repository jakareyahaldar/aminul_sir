const adminColl = require("../db/models/adminSchema.js")
const userColl = require("../db/models/userSchrma.js")
const bookColl = require("../db/models/bookSchema.js")
const examColl = require("../db/models/examSchema.js")
const sliderColl = require("../db/models/sliderSchema.js")
const videoColl = require("../db/models/videoSchema.js")
const noticeColl = require("../db/models/noticeSchema.js")

const { uploadFile, removeFile } = require("../utilities/imagekit.js")

const jwt = require('jsonwebtoken');

const PRIVET_KEY = process.env.PRIVET_KEY
const Controlars = {}


// __________________ADMIN COLLECTION
// Admin login
Controlars.adminLogin = async (req,resp)=>{
  try{
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

// Edit Dynamik Fild on Admin 
Controlars.AdminEditDynamic = async (req,resp)=>{
  try{
    const [admin] = await adminColl.find()
    for(const fild in req.body ){
      if(fild==="password"){
        const hashPassword = jwt.sign( req.body.password , PRIVET_KEY)
        admin[fild] = hashPassword
      }else{
        admin[fild] = req.body[fild]
      }
    }
    await admin.save()
    resp.status(200).json({ message:"ok" })
  }catch(err){
    resp.status(500).json({message:err.message})
  }
}




// _______________________USER COLLECTION 
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

// Delete user 
Controlars.deleteUser = async (req,resp)=>{
  try{
    const { _id } = req.params
    if(!_id) throw Error("Id not found")
    await userColl.findOneAndDelete({_id})
    resp.status(200).json({message:"ok"})
  }catch(err){
    resp.status(500).json({message: err.message})
  }
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


// Add Exams 
Controlars.AddExam = async (req,resp)=>{
  try{
    const filds = ["title","path"]
    const {body} = req
    filds.forEach( fild => {
      if(!body[fild]) throw Error("Please Fill "+fild)
    })
    
    const newExam = new examColl(body)
    const exam = await newExam.save()
    resp.status(200).json({exam})
    
  }catch({message}){
    resp.status(500).json({message})
  }
}

// Get Exams 
Controlars.GetExams = async (req,resp)=>{
  try{
    const exams = await examColl.find()
    resp.status(200).json({exams})
  }catch({message}){
    resp.status(500).json({message})
  }
}


// Update Exam 
Controlars.UpdateExam = async (req,resp)=>{
  try{
    const { _id } = req.body
    if(!_id) throw Error("Id not found.")
    const update = await examColl.findOneAndUpdate({_id},req.body)
    const exam = await examColl.findOne({_id})
    resp.status(200).json({exam})
  }catch({message}){
    resp.status(500).json({message})
  }
}

// Delete exam 
Controlars.deleteExam = async (req,resp)=>{
  try{
    const { _id } = req.body
    if(!_id) throw Error("Id not found.")
    await examColl.findOneAndDelete({_id})
    resp.status(200).json({message:"ok"})
  }catch({message}){
    resp.status(500).json({message})
  }
}


// fileId: '69bab5605c7cd75eb84b3ab6',
//     name: 'me_uu0_tNkoO.JPG',
//     size: 2140477,
//     versionInfo: { id: '69bab5605c7cd75eb84b3ab6', name: 'Version 1' },
//     filePath: '/me_uu0_tNkoO.JPG',
//     url: 'https://ik.imagekit.io/1a42ie8sg/me_uu0_tNkoO.JPG',
//     fileType: 'image',
//     height: 4032,
//     width: 3024,
//     orientation: 1,
//     thumbnailUrl: 'https://ik.imagekit.io/1a42ie8sg/tr:n-ik_ml_thumbnail/me_uu0_tNkoO.JPG',
//     AITags: null,
//     description: null
// Admin Avatar  
Controlars.AdminAvatar = async (req,resp)=>{
  try{
    const file = req.files[0]
    // upload 
    const {error,response} = await uploadFile(file.originalname,file.buffer)
    const { fileId, url } = response
    // getAdmin
    const [admin] = await adminColl.find()
    admin.avatar = url
    const prev_avatar_id = admin.avatar_id
    admin.avatar_id = fileId
  
    // save admin 
    await admin.save()
    
    // delete prev avatar 
    if(prev_avatar_id){
      await removeFile(prev_avatar_id)
    }
    
    resp.status(200).json({message:"ok"})
  }catch({message}){
    resp.status(500).json({message})
  }
}

//__________________SLIDER CONTROLARS

// Add Slider 
Controlars.AddSlider = async (req,resp)=>{
  try{
    const { originalname, buffer } = req.files[0]
    const slider = req.body
    // file upload 
    const {error,response} = await uploadFile(originalname,buffer)
    if(error) throw Error(error)
    const { fileId, url } = response
    // create mongoose obj
    const newSlider = new sliderColl({...slider, image: url, image_id: fileId })
    const save = await newSlider.save()
    resp.status(200).json({ data: save })
  }catch({message}){
    resp.status(500).json({message})
  }
}

// Get Sliders
Controlars.GetSliders = async (req,resp)=>{
  try{
    const sliders = await sliderColl.find()
    resp.status(200).json({ data: sliders })
  }catch({message}){
    resp.status(500).json({message})
  }
}

// Delete Slider
Controlars.deleteSlider = async (req,resp)=>{
  try{
    const { _id } = req.body
    // getting image id
    const slider = await sliderColl.findOne({_id})
    const image_id = slider.image_id
    // delete slider
    await sliderColl.findOneAndDelete({_id})
    // delete image from imagekit
    await removeFile(image_id)
    resp.status(200).json({ message:"ok" })
  }catch({message}){
    resp.status(500).json({message})
  }
}

// ___________________VIDEO CONTROLARS
Controlars.addVideo = async (req,resp)=>{
  try{
    const video = new videoColl(req.body)
    const save = await video.save()
    resp.status(200).json({ data: save })
  }catch({message}){
    resp.status(500).json({message})
  }
}

// Get videos 
Controlars.GetVideos = async (req,resp)=>{
  try{
    const data = await videoColl.find()
    resp.status(200).json({ data })
  }catch({message}){
    resp.status(500).json({message})
  }
}

// Delete video
Controlars.deleteVideo = async (req,resp)=>{
  try{
    const { _id } = req.body
    if(!_id) throw Error("Id Not Found.")
    await videoColl.findOneAndDelete({_id})
    resp.status(200).json({message:"ok"})
  }catch({message}){
    resp.status(500).json({message})
  }
}

// update video
Controlars.updateVideo = async (req,resp)=>{
  try{
    const { _id } = req.body
    if(!_id) throw Error("Id Not Found.")
    await videoColl.findOneAndUpdate({_id},req.body)
    resp.status(200).json({data:req.body})
  }catch({message}){
    resp.status(500).json({message})
  }
}


// NOTICE CONTROLARS 
// Add notice
Controlars.addNotice = async (req,resp)=>{
  try{
    const mongoNotice = new noticeColl(req.body)
    const notice = await mongoNotice.save()
    resp.status(200).json({notice})
  }catch({message}){
    resp.status(500).json({message})
  }
}
// Get notice
Controlars.getNotice = async (req,resp)=>{
  try{
    const data = await noticeColl.find().sort({ createdAt: -1 })
    resp.status(200).json({data})
  }catch({message}){
    resp.status(500).json({message})
  }
}

// Update Notice
Controlars.updateNotice = async (req,resp)=>{
  try{
    const { _id } = req.body
    await noticeColl.findOneAndUpdate({_id},req.body)
    resp.status(200).json({message:"ok"})
  }catch({message}){
    resp.status(500).json({message})
  }
}

// Delete Notice 
Controlars.deleteNotice = async (req,resp)=>{
  try{
    const { _id } = req.body
    await noticeColl.findOneAndDelete({_id})
    resp.status(200).json({message:"ok"})
  }catch({message}){
    resp.status(500).json({message})
  }
}

// Add Breaking Notice 
Controlars.addBreakingNotice = async (req,resp)=>{
  try{
   const { text } = req.body
   if(!text) throw Error("Text not fiund.")
    // Delete older
    await noticeColl.findOneAndDelete({breaking: true})
   // addNew 
   const New = new noticeColl({
     title:"breaking news",
     description: text,
     breaking: true
   })
   const breakingNews = await New.save()
   resp.status(200).json({data:breakingNews})
  }catch({message}){
    resp.status(500).json({message})
  }
}


module.exports = Controlars