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

router.route('/vote').patch((req,res)=>{
    const username = req.body.username;
    const question = req.body.question;
    const voter = req.body.voter;
    var vote = req.body.vote;
    Interchange.find({username, question})
    .then(interchanges=>{
        let willVote = true;
        if(vote===1){
            interchanges[0].upvoters.forEach((_voter)=>{
                if(_voter===voter){
                    willVote = false;
                }
            })
            if(willVote){
                let votes = interchanges[0].votes+vote;
                let upvoters = interchanges[0].upvoters;
                let downvoters = interchanges[0].downvoters;
                let i = downvoters.indexOf(voter);
                downvoters.splice(i,1);
                upvoters.push(voter)
                Interchange.updateMany({username, question}, {$set: { "votes" : votes, "upvoters": upvoters, "downvoters": downvoters}})
                .then(interchanges=>res.json(interchanges))
                .catch(err=>res.status(400).json(err))
            }
        }
        else{
            interchanges[0].downvoters.forEach((_voter)=>{
                if(_voter===voter){
                    willVote = false;
                }
            })
            if(willVote){
                let votes = interchanges[0].votes+vote;
                let downvoters = interchanges[0].downvoters;
                let upvoters = interchanges[0].upvoters;
                let i = upvoters.indexOf(voter);
                upvoters.splice(i,1);
                downvoters.push(voter)
                Interchange.updateMany({username, question}, {$set: { "votes" : votes, "upvoters": upvoters, "downvoters": downvoters}})
                .then(interchanges=>res.json(interchanges))
                .catch(err=>res.status(400).json(err))
            }
        }
        if(!willVote)
            res.send("Already voted");
    })
    .catch(err=>res.status(400).json('Error: '+err));

})

module.exports = router;