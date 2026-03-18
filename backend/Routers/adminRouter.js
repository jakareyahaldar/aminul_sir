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


module.exports = router