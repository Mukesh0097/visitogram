const express = require('express');
const {check} = require('express-validator');
const fileUpload = require('../middleware/file-upload');
const {userList,userSignUp,login} = require('../controller/userController')
const Router = express.Router();

Router.get('/',userList);
Router.post('/signUp',fileUpload.single('image'),[ check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),check("password").isLength({min:6})],userSignUp)

Router.post('/login',login);



module.exports = Router;
