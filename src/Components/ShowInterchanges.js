import React from 'react';
class ShowInterchanges extends React.Component{
    render(){
        return(
            <div>
                {this.props.interchanges.map((interchange,i)=><div key={i}>
                    <h4>Question: {interchange.question}</h4>
                    <h4>Answer: {interchange.answer}</h4>
                    {interchange.tags.map((tag,j)=><span key={j}>
                        #{tag} 
                    </span>)}
                    <br/>
                    Votes: {interchange.votes}
                    <br/>
                    Time Required: {interchange.timeDifficulty}
                    <br/>
                    By: {interchange.username}
                </div>)}
            </div>
        )
    }
}

export default ShowInterchanges