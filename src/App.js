import React, { Component, Fragment } from 'react';
import Login from './Components/Login';
import PersistentDrawerLeft from './Components/Drawer';
import {BrowserRouter, Route} from 'react-router-dom'
import './App.css';

const Web3 = require('web3');

class App extends React.Component{
  
  state = {
    loggedIn: false,
    username: "",
    accounts: [],
    balance: 0,
    web3: null,

  }
  login = (username)=>{
    this.setState({loggedIn:true})
    this.setState({username})
    alert("Logged In")
  }
  async loadWeb3(){
    let web3;
    if(window.ethereum){
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    }
    else if(window.web3)
        web3 = new Web3(window.web3.currentProvider);
    this.setState({web3});
  }
  async loadBlockchainData(){
      const web3 = this.state.web3;
      const accounts = await web3.eth.getAccounts();
      this.setState({
        accounts
      });
      const balance  = await web3.eth.getBalance(accounts[0]);
      this.setState({
        balance
      })
      const networkId = await web3.eth.net.getId();
      console.log(this.state.accounts[0]);
  }
  async componentDidMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  render(){
    return (
      <div className="App">
        {!this.state.loggedIn?<Login web3 = {this.state.web3} accounts = {this.state.accounts} loginUser = {this.login}/>:
          <BrowserRouter>
            <Fragment>
              <PersistentDrawerLeft web3 = {this.state.web3} accounts = {this.state.accounts} username={this.state.username}/>
            </Fragment>
          </BrowserRouter>}
      </div>
    );
  }
}

export default App;
