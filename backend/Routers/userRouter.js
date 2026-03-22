const express = require("express")
const router = express.Router()
const Controlars = require("../Controlars/userControlar.js")

router.post("/signup",Controlars.signupUser)
router.post("/login",Controlars.loginUser)
router.get("/get-user/:id",Controlars.getUser)
router.post("/users/avatar",Controlars.changeAvatar)
router.put("/users",Controlars.updateUser)

module.exports = router