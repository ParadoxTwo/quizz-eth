import React from 'react';
import './popupStyles.css';
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    TextInput
} from 'react-native';
import APIKit from '../APIKit';
const initialState={
    question: "",
    answer: "",
    options: [],
    tags: [],
    votes: 0,
    timeDifficulty: 0,
    currentOption: "",
    currentTag: ""
}
class AddInterchange extends React.Component{
    state = {
        username: this.props.username,
        question: "",
        answer: "",
        options: [],
        tags: [],
        votes: 0,
        timeDifficulty: 0,
        date: null,
        currentOption: "",
        currentTag: ""
    }
    componentDidMount(){
        this.setState({username:this.props.username})
    }
    onQuestionChange = question => {
        this.setState({question});
    };
    onAnswerChange = answer => {
        this.setState({answer});
    };
    onTimeChange = timeDifficulty => {
        this.setState({timeDifficulty});
    };
    onOptionChange = currentOption => {
        this.setState({currentOption});
    }
    onTagChange = currentTag => {
        this.setState({currentTag});
    }
    onPressAddOption(){
        let options = this.state.options;
        options.push(this.state.currentOption);
        this.setState({options})
    }
    onPressAddTag(){
        let tags = this.state.tags;
        tags.push(this.state.currentTag);
        this.setState({tags})
    }
    onPressAdd(){
        var {username,question,answer,options,tags,votes,timeDifficulty} = this.state;
        var payload = {username,question,answer,options,tags,votes,timeDifficulty}
        const onSuccess = result =>{
            this.props.refresh();
            this.setState(initialState)
            console.log(result);
        }
        const onFailure = err =>{
            console.log(err);
        }
        APIKit.post('/interchange/add',payload,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(onSuccess)
        .catch(onFailure)
    }
    render(){
        return(
            <div>
                {this.props.popup?<div className='popup'>
                    <div className='popup_inner'>
                        <button type="button" className="btn btn-info" onClick={this.props.closePopup}>X</button><br/><br/>
                        <View>
                            <p>{this.state.username}, add a question and answer:</p>
                            <Text>Question:</Text>
                            <TextInput
                                value={this.state.question}
                                maxLength={256}
                                placeholder="Type your question"
                                autoCapitalize="none"
                                autoCorrect={true}
                                returnKeyType="next"
                                onSubmitEditing={event =>
                                    this.passwordInput.wrappedInstance.focus()
                                }
                                onChangeText={this.onQuestionChange}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#999"
                            />
                            <Text>Answer:</Text>
                            <TextInput
                                value={this.state.answer}
                                maxLength={256}
                                placeholder="Type the correct answer"
                                autoCapitalize="none"
                                autoCorrect={true}
                                returnKeyType="next"
                                onSubmitEditing={event =>
                                    this.passwordInput.wrappedInstance.focus()
                                }
                                onChangeText={this.onAnswerChange}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#999"
                            />
                            <Text>Options:</Text><br/>
                            <Text id="options">
                                <ul>
                                    {this.state.options.map((option,i)=><li key={i}>{option}</li>)}
                                </ul>
                            </Text>
                            <TextInput
                                id = "option"
                                maxLength={256}
                                placeholder="Option other than answer"
                                autoCapitalize="none"
                                autoCorrect={true}
                                returnKeyType="next"
                                onChangeText={this.onOptionChange}
                                onSubmitEditing={event =>
                                    this.passwordInput.wrappedInstance.focus()
                                }
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#999"
                            />
                            <Button title="Add Option" color="#205050" onPress={this.onPressAddOption.bind(this)}/>
                            <Text>Tags:</Text><br/>
                            <Text id="tags">
                                <ul>
                                    {this.state.tags.map((tag,i)=><li key={i}>{tag}</li>)}
                                </ul>
                            </Text>
                            <TextInput
                                id = "tag"
                                maxLength={256}
                                placeholder="Tags (keywords or topics)"
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="next"
                                onChangeText={this.onTagChange}
                                onSubmitEditing={event =>
                                    this.passwordInput.wrappedInstance.focus()
                                }
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#999"
                            />
                            <Button title="Add Tag" color="#205050" onPress={this.onPressAddTag.bind(this)}/>
                            <TextInput
                                id = "timeDifficulty"
                                maxLength={256}
                                placeholder="Amount of time required to solve/answer"
                                autoCapitalize="none"
                                autoCorrect={false}
                                textContentType="oneTimeCode"
                                returnKeyType="next"
                                onChangeText={this.onTimeChange}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#999"
                            />
                            <Button
                                onPress={this.onPressAdd.bind(this)}
                                title="Add"
                                color="#841584"
                                accessibilityLabel="Add the interchange"
                            />
                        </View>
                    </div>
                </div>:null}
            </div>
        )
    }
}

export default AddInterchange