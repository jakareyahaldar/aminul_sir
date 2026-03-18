const express = require("express")
const router = express.Router()
const Controlars = require("../Controlars/userControlar.js")

router.post("/signup",Controlars.signupUser)
router.post("/login",Controlars.loginUser)
router.get("/get-user/:id",Controlars.getUser)


module.exports = router