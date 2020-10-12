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
        console.log(user)
        res.json(user)
    })
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/reputation').patch((req,res)=>{
    const username = req.body.username;
    var reputation = req.body.reputation;
    console.log(username);
    User.find({"username": username})
    .then(user=>{
        console.log(user)
        reputation+=user[0].reputation;
        User.updateOne({"username": username}, {$set: { "reputation" : reputation}})
        .then(user=>{
            console.log(user)
            res.send({reputation})
        })
        .catch(err=>res.status(405).json('Error: '+err));
    })
    .catch(err=>res.status(405).json('Error: '+err));
})

router.route('/add').post((req,res)=>{
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const address = req.body.address;
    const newUser = new User({username: username, password: password, address: address, reputation: 0});
    newUser.save()
    .then(()=>res.json('New user added!'))
    .catch(err=>res.status(400).json('Error: '+err));
});

module.exports = router;