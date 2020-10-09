import React from 'react';
import AddInterchange from './AddInterchange';
import ShowInterchanges from './ShowInterchanges';
import APIKit from '../APIKit'


class Home extends React.Component{
    state = {
        popup: false,
        interchanges: [],
        loaded: false,
    }
    loadData(){
        APIKit.get('/interchange')
        .then(response=>{
            console.log(response)
            this.setState({interchanges: response.data})
            this.setState({loaded: true})
        })
        .catch(err=>console.log(err));
    }
    componentDidMount(){
        this.loadData()
    }
    render(){
        return(
            <div>
                Welcome, {this.props.username}
                {this.props.username?<AddInterchange refresh={()=>this.loadData()} closePopup={()=>this.setState({popup:false})} popup={this.state.popup} username={this.props.username}/>:null}
                <button onClick={()=>this.setState({popup: true})}>Add Interchange</button>
                {this.state.loaded?<ShowInterchanges interchanges={this.state.interchanges}/>:null}
            </div>
        )
    }
}

export default Home