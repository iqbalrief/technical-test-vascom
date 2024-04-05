
const express = require('express');
const router = express.Router();
const authToken = require('../middleware')
const indexCtrl = require("../controller/index");

router.post("/signin", indexCtrl.usersCtrl.signIn);
router.post("/signup", indexCtrl.usersCtrl.signUp);
router.get("/users", authToken.verifyToken, authToken.isAdmin, indexCtrl.usersCtrl.getAllByUsers);
router.get("/users/:id", authToken.verifyToken, authToken.isAdmin, indexCtrl.usersCtrl.getUserById);
router.put("/updated/:id", authToken.verifyToken, authToken.isAdmin, indexCtrl.usersCtrl.updateUsersByAdmin);
router.put("/updated-users/:id", authToken.verifyToken, authToken.isUser, indexCtrl.usersCtrl.updateUsers);
router.delete("/deleted/:id", authToken.verifyToken, indexCtrl.usersCtrl.deleteUsers);
// router.post("/logout", indexCtrl.usersCtrl.logout);








module.exports = router