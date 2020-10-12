import React from 'react';

class TestResult extends React.Component{
    state={
        result: {},
        finished: false
    }
    componentDidMount(){
        let result = this.props.getResult();
        this.setState({finished: this.props.quizFinished})
        this.setState({result})
    }
    render(){
        return(<div>
            TEST FINISHED!<br/>
        {this.state.finished?<span>{this.state.result.marks}/{this.state.result.totalMarks}</span>:null}
        </div>)
    }
}

export default TestResult