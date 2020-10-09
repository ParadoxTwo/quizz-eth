const router = require('express').Router();
let Interchange = require('../models/interchange.model');

router.route('/').get((req,res)=>{
    Interchange.find()
    .then(interchanges=>res.json(interchanges))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const question = req.body.question;
    const options = req.body.options;
    const answer = req.body.answer;
    const tags = req.body.tags;
    const votes = req.body.votes;
    const timeDifficulty = req.body.timeDifficulty;
    var date = new Date();
    const payload = {username,question,answer,options,tags,votes,timeDifficulty,date}
    console.log(payload)
    const newInterchange = new Interchange(payload);
    newInterchange.save()
    .then(()=>res.json('New Q&A added!'))
    .catch(err=>res.status(400).json('Error: '+err));
});

module.exports = router;