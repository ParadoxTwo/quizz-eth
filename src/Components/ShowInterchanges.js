import React from 'react';
import APIKit from '../APIKit';
class ShowInterchanges extends React.Component{
    upvote = (e)=>{
        let username = e.target.name;
        let question = e.target.value;
        let voter = this.props.username;
        const vote = 1;
        APIKit.patch('/interchange/vote',{voter,username,question,vote})
        .then((res)=>{
            console.log(res)
            if(res.data!=="Already voted")
                APIKit.patch('/users/reputation',{username,reputation: 1})
                .then((resp)=>{
                    console.log(resp)
                    if(voter===username)
                        this.props.updateRep(resp.data.reputation);
                    else{
                        APIKit.patch('/users/reputation',{username:voter,reputation: 0})
                        .then((resp)=>{
                            console.log(resp)
                            this.props.updateRep(resp.data.reputation);
                        })
                        .catch(err=>console.log(err))
                    }
                    this.props.refresh();
                })
                .catch(err=>console.log(err))
            else
                this.props.refresh();
        })
        .catch(error=>console.log(error))
    }
    downvote = async (e)=>{
        let username = e.target.name;
        let question = e.target.value;
        let voter = this.props.username;
        const vote = -1;
        APIKit.patch('/interchange/vote',{voter,username,question,vote})
        .then((res)=>{
            console.log(res)
            if(res.data!=="Already voted")
                APIKit.patch('/users/reputation',{username,reputation: -1})
                .then((resp)=>{
                    console.log(resp)
                    if(voter===username)
                        this.props.updateRep(resp.data.reputation);
                    else{
                        APIKit.patch('/users/reputation',{username:voter,reputation: 0})
                        .then((resp)=>{
                            console.log(resp)
                            this.props.updateRep(resp.data.reputation);
                        })
                        .catch(err=>console.log(err))
                    }
                    this.props.refresh();
                })
                .catch(err=>console.log(err))
            else
                this.props.refresh();
        })
        .catch(error=>console.log(error))
    }
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
                    Votes: {interchange.votes} <button value={interchange.question} name={interchange.username}  onClick={this.upvote}>Up</button> <button value={interchange.question} name={interchange.username} onClick={this.downvote}>Down</button>
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