import React from 'react';
import Test from './Test';
import TestResult from './TestResult';
import { Text, TextInput, Button, TouchableOpacity, View } from 'react-native';
import APIKit from '../APIKit'

const styles = {
    containerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f6f6f6',
    },
    input: {
        height: 50,
        padding: 12,
        width: "15%",
        backgroundColor: 'white',
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        marginBottom: 10
    },
    button: {
        color: "#205050",
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        height: 50,
        width: 100,
        padding: 12,
        borderColor: "#204040",
        borderWidth: 2,
        borderRadius: 6
      },
}

const initialState = {
    topics:[],
    timeDifficulty: 0,
    currentTopic:"",
    quizOngoing: false,
    interchanges: null,
    allInterchanges: null,
    result: null
}

class Quiz extends React.Component{
    state = {
        topics:[],
        timeDifficulty: 0,
        currentTopic:"",
        quizOngoing: false,
        interchanges: null,
        allInterchanges: null,
        quizFinished: false,
        result: null,
        finishTime: null,
    }
    onTopicChange = currentTopic=>{
        this.setState({currentTopic})
    }
    onTimeChange = timeDifficulty=>{
        this.setState({timeDifficulty})
    }
    onPressAddTopic(){
        let topics = this.state.topics;
        topics.push(this.state.currentTopic)
        this.setState({topics})
    }
    handleQuizSubmission=(result)=>{
        this.setState({quizOngoing:false, quizFinished:true})
        this.setState({result})
    }
    getResult = ()=>{
        return this.state.result;
    }
    sort_by_key(array, key){
        return array.sort(function(a, b){
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }
    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    shuffle2(array) {
        let counter = array.length;
    
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);
    
            // Decrease counter by 1
            counter--;
    
            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
    
        return array;
    }
    onPressReset(){
        this.setState(initialState)
    }
    onPressStart(){
        console.log(this.state.topics)
        console.log(this.state.timeDifficulty)
        alert("Starting quiz.. It may take a few seconds. Please be patient.")
        this.setState({quizFinished:false});
        APIKit.get('/interchange')
        .then(res=>{
            this.setState({allInterchanges: res.data})
        })
        .then(()=>{
            let temp = [];
            let interchanges = [];
            let time = this.state.timeDifficulty;
            let topics = this.state.topics;
            let address = this.props.accounts[0];
            this.state.allInterchanges.forEach(interchange => {
                let count=0;
                interchange.tags.forEach(tag=>{
                    topics.forEach(topic=>{
                        if(topic.toLowerCase()===tag.toLowerCase())
                            count=count+1;
                    })
                })
                temp.push({count: count,interchange: interchange})
            });
            console.log(temp);
            temp = this.sort_by_key(temp,'count')
            console.log(temp)
            temp.forEach(obj=>{
                if(time-obj.interchange.timeDifficulty>=0){
                    interchanges.push(obj.interchange);
                    time-=obj.interchange.timeDifficulty;
                }
            })
            console.log(interchanges);
            interchanges = this.shuffle2(interchanges);
            console.log(interchanges);
            APIKit.post('/quiz',{interchanges, address}, { timeout: 30000})
            .then(res=>{
                console.log(res)
                this.setState({interchanges,finishTime: new Date(res.data.finishTime), quizOngoing:true})
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    }
    componentDidMount(){

    }
    render(){
        return(
            <div>
            {!this.state.quizOngoing?<View style={styles.containerStyle}>
                <h4>Add Topics/Tags:</h4>
                {this.state.topics.map((topic)=><>
                    <Text>#{topic}</Text>
                </>)}
                <br/>
                <TextInput
                    style={styles.input}
                    value={this.state.currentTopic}
                    maxLength={256}
                    placeholder="Enter tag/topic..."
                    autoCapitalize="none"
                    onChangeText={this.onTopicChange}
                    autoCorrect={false}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity  style={styles.button} onPress={this.onPressAddTopic.bind(this)}>
                    <Text>Add</Text>
                </TouchableOpacity>
                <h4>Time:</h4>
                <TextInput
                    style={styles.input}
                    value={this.state.timeDifficulty}
                    maxLength={256}
                    placeholder="Number of minutes of quiz (also the total marks)"
                    autoCapitalize="none"
                    onChangeText={this.onTimeChange}
                    autoCorrect={false}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity  style={styles.button} onPress={this.onPressStart.bind(this)}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={this.onPressReset.bind(this)}>
                    <Text>Reset</Text>
                </TouchableOpacity>
            </View>:<Test handleQuizSubmission = {this.handleQuizSubmission} finishTime = {this.state.finishTime} web3={this.props.web3} username={this.props.username} accounts = {this.props.accounts} interchanges={this.state.interchanges}/>}
            {this.state.quizFinished?<TestResult getResult = {this.getResult} finished={this.state.quizFinished} result={this.state.result}/>:null}
            </div>
        )
    }
}

export default Quiz