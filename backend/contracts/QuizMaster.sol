
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract QuizMaster{
    mapping(address=>uint) public time;
    mapping(address=>uint) public marks;
    // time public dateTime;
    address public system;
    mapping(address=>uint256) public quizCount;
    mapping(address=>uint) questionCount;
    mapping(address=>mapping(uint=>string)) public questions;
    mapping(address=>mapping(uint=>uint)) public weightage;
    mapping(address=>mapping(uint=>string)) public answers;
    
    constructor() public{
        system = msg.sender;
    }
    function startQuiz(address _quizzer, uint _time, string[] memory _questions, string[] memory _answers, uint[] memory _weights) public{
        time[_quizzer] = _time;
        marks[_quizzer] = 0;
        questionCount[_quizzer] = _answers.length-1;
        for(uint i=0;i<=questionCount[_quizzer];i++){
            questions[_quizzer][i] = _questions[i];
            answers[_quizzer][i] = _answers[i];
            weightage[_quizzer][i] = _weights[i];
        }
        quizCount[_quizzer]++;
    }
    function checkResult(address _quizzer, string[] memory _answers) public returns(uint, uint){
        marks[_quizzer] = 0;
        for(uint i=0;i<=questionCount[_quizzer];i++){
            if(keccak256(abi.encodePacked((answers[_quizzer][i]))) == keccak256(abi.encodePacked((_answers[i])))){
                marks[_quizzer]+=weightage[_quizzer][i];
            }
        }
        return (marks[_quizzer],time[_quizzer]);
    }
}