const express = require("express")
const router = express.Router()
const Controlars = require("../Controlars/adminControlar.js")

router.post("/admin-login",Controlars.adminLogin)
router.get("/get-admin/:id",Controlars.getAdmin)
router.post("/admin/editdynamic",Controlars.AdminEditDynamic)

router.get("/users",Controlars.Users)
router.patch("/users/:id/approve",Controlars.AproveChange)
router.delete("/users/:_id",Controlars.deleteUser)

router.post("/book",Controlars.addBook)
router.get("/book",Controlars.getBooks)
router.put("/book",Controlars.updateBooks)
router.delete("/book/:_id/delete",Controlars.deleteBook)

// Exams  
router.post("/exam",Controlars.AddExam)
router.get("/exam",Controlars.GetExams)
router.put("/exam",Controlars.UpdateExam)
router.delete("/exam",Controlars.deleteExam)

// Avatar  
router.post("/admin/avatar",Controlars.AdminAvatar)

// Slider  
router.post("/slider",Controlars.AddSlider)
router.get("/slider",Controlars.GetSliders)
router.delete("/slider",Controlars.deleteSlider)
//router.put("/slider",Controlars.editSlider)


// Video 
router.post("/video",Controlars.addVideo)
router.get("/video",Controlars.GetVideos)
router.delete("/video",Controlars.deleteVideo)
router.put("/video",Controlars.updateVideo)

// Notice
router.post("/notice",Controlars.addNotice)
router.post("/breaking/notice",Controlars.addBreakingNotice)
router.get("/notice",Controlars.getNotice)
router.put("/notice",Controlars.updateNotice)
router.delete("/notice",Controlars.deleteNotice)


module.exports = router