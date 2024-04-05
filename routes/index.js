const express = require('express');
const router = express.Router();
const userRouter = require("./usersRoute")
const producRouter = require("./productRoute")

router.use("/auth", userRouter)
router.use("/product", producRouter)





module.exports = router;