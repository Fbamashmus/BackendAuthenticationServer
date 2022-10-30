const express = require('express');
const router = express.Router();
const userControl = require('../controllers/userControl');

router.route('/')
    .get( userControl.getAlluserss)
    .post(userControl.createNewuserss)
    .put(userControl.updateuserss)
    .delete(userControl.deleteuserss);

router.route('/:id')
    .get(userControl.getuserss);

module.exports = router;