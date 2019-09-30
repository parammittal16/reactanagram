import React, { Component } from 'react';
import logo from '../../images/iu.png';
import './home.css';
import {connect } from 'react-redux';
import { addName } from '../../store/actions/getUserName';


class home extends Component {
    state = {
        name: ''
    }
    HandleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    HandleSubmit = (e) => {
        this.props.addName({name: this.state.name})
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                <div className="App-logo"><h1 style={{'fontSize': '5rem'}}>REACTANAGRAM</h1><img style={{'height':'200px'}} src={logo}  alt="logo" /></div>
                <p>
                    ENTER YOUR NAME
                </p>
                <input id="password" type="text" onChange={this.HandleChange}/>
                <br />
                <button className="btn btn-grad text-white" onClick={this.HandleSubmit}>PLAY</button>
            </header>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addName: (name) => dispatch(addName(name))
    }
}

export default connect(null , mapDispatchToProps)(home);