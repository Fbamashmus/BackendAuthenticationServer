const data = {
    userss: require('../model/userss.json'),
    setuserss: function (data) { this.userss = data }
}

const getAlluserss = (req, res) => {
    res.json(data.userss);
}

const createNewuserss = (req, res) => {
    const newuserss = {
        id: data.userss?.length ? data.userss[data.userss.length - 1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newuserss.firstname || !newuserss.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }

    data.setuserss([...data.userss, newuserss]);
    res.status(201).json(data.userss);
}

const updateuserss = (req, res) => {
    const userss = data.userss.find(emp => emp.id === parseInt(req.body.id));
    if (!userss) {
        return res.status(400).json({ "message": `User ID ${req.body.id} not found` });
    }
    if (req.body.firstname) userss.firstname = req.body.firstname;
    if (req.body.lastname) userss.lastname = req.body.lastname;
    const filteredArray = data.userss.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, userss];
    data.setuserss(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.userss);
}

const deleteuserss = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Users ID ${req.body.id} not found` });
    }
    const filteredArray = data.userss.filter(emp => emp.id !== parseInt(req.body.id));
    data.setuserss([...filteredArray]);
    res.json(data.userss);
}

const getuserss = (req, res) => {
    const userss = data.userss.find(emp => emp.id === parseInt(req.params.id));
    if (!userss) {
        return res.status(400).json({ "message": `User ID ${req.params.id} not found` });
    }
    res.json(userss);
}

module.exports = {
    getAlluserss,
    createNewuserss,
    updateuserss,
    deleteuserss,
    getuserss
}