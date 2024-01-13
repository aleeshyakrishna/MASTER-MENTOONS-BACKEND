var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const authentication = require('../middlewares/jwtAuth')
//signup 

// router.get('/',userController.getHome)
router.post('/signup',userController.signup)
router.post('/login',userController.userLogin)
router.get('/products',userController.getProduct)
router.get('/prodView/:id',userController.getOneProd)
router.get('/getCategory',userController.getAllCategory)
router.get('/getOneCategory/:id',userController.getOneCategory)
router.post('/addToCart',authentication.authenticateToken,userController.addToCart)
router.post('/removeCartItem',authentication.authenticateToken,userController.RemoveCart)
router.get('/getCart/:userId',authentication.authenticateToken,userController.getCart)
router.post('/writeUs',userController.writeUs)
router.post('/hireme',authentication.authenticateToken,userController.hireMe)
module.exports = router;