const express =  require("express");
var app = express();
const path = require('path');
const port = 3000;
const verifyJWT = require('./middleware/verifyJWT');


//app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use('/', express.static(path.join(__dirname)));
app.use('/reg', require('./routes/reg'));
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/auth'));

app.use(verifyJWT);
app.use('/users', require('./routes/users'));

/*
app.get('/', (req, res)=>{
    res.end("Routing App");
})*/

app.listen(port,()=>{
    console.log(`running on ${port}`)
})

