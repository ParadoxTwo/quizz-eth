import React from 'react';
import Login from './Components/Login';
import Home from './Components/Home'
import './App.css';

class App extends React.Component{

  state = {
    loggedIn: false,
    username: ""
  }
  login = (username)=>{
    this.setState({loggedIn:true})
    this.setState({username})
    alert("Logged In")
  }

  render(){
    return (
      <div className="App">
        {!this.state.loggedIn?<Login loginUser = {this.login}/>:<Home username={this.state.username}/>}
      </div>
    );
  }
}

export default App;
