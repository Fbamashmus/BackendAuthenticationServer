const express = require('express');
const router = express.Router();
const authControl = require('../controllers/authControl');

router.post('/', authControl.handlelogin);
/*
router.get('/accounts', (req,res)=>{
    res.json({userData:accounts});
})*/

module.exports = router;