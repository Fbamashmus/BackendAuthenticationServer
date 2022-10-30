const usersDB = {
    users : require('../model/users.json'),
    setUsers : function (data) { this.users = data }
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromise = require('fs').promises;
const path = require('path');

const handlelogin = async(req, res) => {
    const { user, pwd} = req.body;
    if (!user || !pwd){
        return res.status(400).json({ 'message:' : 'Username and passowrd are required.'});
    }
    const founduser = usersDB.users.find(person => person.username === user);
    if(!founduser) return res.sendStatus(401);

    const match = await bcrypt.compare(pwd, founduser.password);
    if (match){
        const accessToken = jwt.sign(
            {username: founduser.username},
            process.env.ACCESS_TOKEN_SECRET,{expiresIn: '30s'}
        );
        const refreshToken = jwt.sign(
            {username: founduser.username},
            process.env.REFRESH_TOKEN_SECRET,{expiresIn: '1d'}
        );
        const otherUsers = usersDB.users.filter(person => person.username !== founduser.username);
        const currentUSer = {...founduser, refreshToken};
        usersDB.setUsers([...otherUsers, currentUSer]);
        await fsPromise.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.cookie('jwt', refreshToken, {httpOnly: true, maxxAge: 24 * 60 * 60 *   1000});
        res.json({ accessToken });  
    }else{
        res.sendStatus(401);
    }
};

module.exports = {handlelogin};