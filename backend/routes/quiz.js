const router = require('express').Router();
const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "under detect verify bean lobster weapon jelly cost hungry evidence tiger parade";
// For localhost
const web3 = new Web3(new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/cbfff3438831426484f5b7bf334709b2"));
let QuizMaster;

fs.readFile('./abis/QuizMaster.json','utf-8',(err,jsonString)=>{
    QuizMaster = JSON.parse(jsonString);
 });
 

router.route('/').post(async (req,res)=>{
    const interchanges = req.body.interchanges;
    const address = req.body.address;
    console.log(interchanges);
    var totalTime = 0, weightage = [], questions = [], answers = [];
    interchanges.forEach(interchange => {
        totalTime+=interchange.timeDifficulty;
        weightage.push(interchange.timeDifficulty);
        questions.push(interchange.question);
        answers.push(interchange.answer);
    });
    let accounts, networkId, quizMaster, quizMasterNetwork;
    accounts = await web3.eth.getAccounts();
    networkId = await web3.eth.net.getId();
    quizMasterNetwork = QuizMaster.networks[networkId];
    if(quizMasterNetwork){
        quizMaster = new web3.eth.Contract(QuizMaster.abi, quizMasterNetwork.address, {from: accounts[0], gas: '1000000', gasPrice: '100000000000'});
        await quizMaster.methods.startQuiz(address, totalTime, questions, answers, weightage)
        .send()
        .then(receipt=>{
            console.log(receipt);
            const startTime = new Date();
            const finishTime = new Date();
            finishTime.setMinutes(finishTime.getMinutes()+totalTime);
            console.log(startTime);
            console.log(finishTime);
            res.send({done:"Quiz started!", startTime, finishTime, totalTime});
        })
    }        
    // res.send("Done")
});
router.route('/result').post(async (req,res)=>{
    var tmp = req.body.answers;
    var answers = []
    tmp.forEach(answer=>{
        if(answer)
            answers.push(answer);
        else
            answers.push("");
    })
    const address = req.body.address;
    console.log(answers);
    let accounts, networkId, quizMaster, quizMasterNetwork;
    accounts = await web3.eth.getAccounts();
    networkId = await web3.eth.net.getId();
    quizMasterNetwork = QuizMaster.networks[networkId];
    if(quizMasterNetwork){
        quizMaster = new web3.eth.Contract(QuizMaster.abi, quizMasterNetwork.address, {from: accounts[0], gas: '1000000', gasPrice: '100000000000'});
        await quizMaster.methods.checkResult(address, answers)
        .send()
        .then(async receipt=>{
            await quizMaster.methods.marks(address).call()
            .then(async marks=>{
                console.log(marks);
                await quizMaster.methods.time(address).call()
                .then(totalMarks=>{
                    res.send({marks,totalMarks});
                })
            })
        })
    }
});

module.exports = router;