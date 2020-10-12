import React from 'react';
import {Text} from 'react-native';
import APIKit from '../APIKit';

class Test extends React.Component{
    state = {
        answers: [],
        options: [],
        interchanges: null,
        ongoing: false,
        finishTime: null,
        hoursLeft: 0,
        minutesLeft: 0,
        timeInterval: null,
        quizInterval: null,
    }
    shuffle(array) {
        let counter = array.length;
        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);
            counter--;
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }
    handleOptionChange = e=>{
        let answers = this.state.answers;
        answers[parseInt(e.target.name)] = e.target.value;
        this.setState({answers})
    }
    handleQuizSubmission = ()=>{
        clearInterval(this.state.timeInterval);
        clearInterval(this.state.quizInterval);
        alert("Submitting quiz now. Please a few seconds for result.");
        const answers = this.state.answers;
        const address = this.props.accounts[0];
        APIKit.post('/quiz/result', {answers,address}, {timeout: 30000})
        .then(result=>{
            APIKit.patch('/users/reputation',{username:this.props.username, reputation: parseInt(result.data.marks)})
            .then(res=>{
                console.log(res);
                alert(`You got ${result.data.marks} out of ${result.data.totalMarks}`)
                this.setState({ongoing:false})
                this.props.handleQuizSubmission(result.data)
            })
            .catch(err=>console.log(err))
        })
    }
    updateTime = ()=>{
        let hoursLeft =this.state.finishTime.getHours()-(new Date().getHours());
        let minutesLeft = this.state.finishTime.getMinutes()-(new Date().getMinutes());
        this.setState({hoursLeft, minutesLeft})
    }
    quizTimeOver = ()=>{
        let currentTime = new Date();
        if(currentTime>this.state.finishTime){
            this.handleQuizSubmission();
        }
    }
    componentDidMount(){
        console.log("interchanges: "+this.props.interchanges)
        let answers = [];
        this.props.interchanges.forEach((interchange)=>{
            answers.push("")
            var temp = []
            temp.push(interchange.answer);
            interchange.options.forEach((option)=>{
                temp.push(option)
            })
            temp = this.shuffle(temp);
            let options = this.state.options;
            options.push(temp);
            this.setState({options})
        })
        this.setState({interchanges: this.props.interchanges, finishTime: this.props.finishTime, ongoing: true, answers});
        this.setState({timeInterval: setInterval(this.updateTime,1000), quizInterval: setInterval(this.quizTimeOver,1000)})
    }
    
    render(){
        return(<div>
            TEST BEGIN!
            {this.state.ongoing?<div>
                <span>Time Left: {this.state.hoursLeft}hrs, {this.state.minutesLeft}mins</span>
                <br/>
                {
                this.state.interchanges.map((interchange,i)=><div key={i}>
                    Q{i+1}: {interchange.question}
                    <br/>
                    {this.state.options[i].map((option,j)=><label key={j}>
                        <input
                            type="radio"
                            name={""+i}
                            value={option}
                            checked={this.state.answers[i] === option}
                            onChange={this.handleOptionChange}
                            className="form-check-input"
                        />
                        {option}
                    </label>)}
                    <br/>
                </div>)
                }
                <button onClick={this.handleQuizSubmission}>Submit</button>
            </div>:null}
        </div>)
    }
}

export default Test