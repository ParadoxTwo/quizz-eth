const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res)=>{
    User.find()
    .then(users=>res.json(users))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/login/:username').get((req,res)=>{
    const username = req.params.username;
    User.find({"username": username})
    .then(user=>{
        res.json(user)
        console.log(user)
    })
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({username: username, password: password});
    newUser.save()
    .then(()=>res.json('New user added!'))
    .catch(err=>res.status(400).json('Error: '+err));
});

module.exports = router;