const express = require('express');
const router = express.Router();
const authToken = require('../middleware')
const indexCtrl = require("../controller/index");

router.get('/', authToken.verifyToken, indexCtrl.productCtrl.getAllProducts);
router.delete('/deleted/:id',  authToken.verifyToken, authToken.isAdmin, indexCtrl.productCtrl.deleteProduct);
router.put('/updated/:id',  authToken.verifyToken, authToken.isAdmin, indexCtrl.productCtrl.updateProduct);
router.get('/:id', authToken.verifyToken,  indexCtrl.productCtrl.getProductById);
router.post('/created', authToken.verifyToken, authToken.isAdmin, indexCtrl.productCtrl.createProduct);

module.exports = router
