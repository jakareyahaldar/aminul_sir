const express = require("express")
const router = express.Router()
const Controlars = require("../Controlars/adminControlar.js")

router.post("/admin-login",Controlars.adminLogin)



module.exports = router