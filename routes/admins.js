// routes/admins.js
var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');

router.post('/login', adminController.postLogin);
router.post('/addCategory',adminController.postCategory)
router.post('/addAgeCategory',adminController.postAgeCategory)
router.post('/addProducts',adminController.postProduct)
router.post('/addOpening',adminController.addOpening)

module.exports = router;
