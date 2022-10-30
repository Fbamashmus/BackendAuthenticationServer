const express = require('express');
const router = express.Router();
const regControl = require('../controllers/regControl');

router.post('/', regControl.handleNewUser);

module.exports = router;