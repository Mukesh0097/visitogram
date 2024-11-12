const express = require('express')
const fileupload = require('../middleware/file-upload')
const {check} = require('express-validator');
const checkAuth = require('../middleware/auth-token');

const Router = express.Router();
const {getPlaceById,getPlacesByUserId,createPlace, updatePlace, deletePlace} = require('../controller/placeController');

Router.get('/:pid',getPlaceById);


Router.get('/user/:uid',getPlacesByUserId);

Router.use(checkAuth);

Router.post('/',
fileupload.single('image'),
[check('title')
.not().isEmpty(),
check('description').
isLength({min:5}),
check('address')
.not()
.isEmpty() ],
createPlace);

Router.patch('/:pid',[check('title').not().isEmpty(),check('description').isLength({min:6}).not().isEmpty()],updatePlace);

Router.delete('/:pid',deletePlace);

module.exports = Router;