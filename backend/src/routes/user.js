const express = require("express");
const router = express.Router();
const userController = require('../controllers/user');
const { runValidation, registerValidation, validationLogin } = require('../validation');
const middleware = require('../middleware/middleware')



router.post('/register', registerValidation, runValidation, userController.RegisterUser);
router.post('/login', validationLogin, runValidation, userController.LoginUser);
router.get('/user', middleware, userController.getUser);
router.put('/forgotpassword', userController.forgotPassword)
router.put('/resetpassword', userController.resetPassword)

module.exports = router