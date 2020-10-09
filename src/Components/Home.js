import React from 'react';
import AddInterchange from './AddInterchange';
class Home extends React.Component{
    render(){
        return(
            <div>
                Welcome, {this.props.username}
                {this.props.username?<AddInterchange username={this.props.username}/>:null}
            </div>
        )
    }
}

export default Home