const express = require("express")
const router = express.Router()
const Controlars = require("../Controlars/adminControlar.js")

router.post("/admin-login",Controlars.adminLogin)
router.get("/get-admin/:id",Controlars.getAdmin)
router.get("/users",Controlars.Users)
router.patch("/users/:id/approve",Controlars.AproveChange)
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



module.exports = router