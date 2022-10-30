const jwt = require('jsonwebtoken');
const { route } = require('../routes/reg');
require('dotenv').config();

const verfiyJWT = (req, res, next)=> {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decode) =>{
            if(err) return res.sendStatus(403);
            req.user = decode.username;
            next();
        }

    )
}

module.exports = verfiyJWT;