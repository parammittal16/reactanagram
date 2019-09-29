import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import {connect } from 'react-redux';

import Game from './components/Game/game';
import Home from './components/home/home';

class App extends Component {
  render() {
    let routes = (
      <Switch>
      <Route exact path='/' component={Home} />
      <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes = (
      <Switch>
      <Route path='/game' component={Game} />
      <Redirect to="/game" />
      </Switch>
      );
    }
    return (
      <BrowserRouter basename="/reactanagram">
      <div className="App">
      {routes}
      </div>
      </BrowserRouter>
    )
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    isAuthenticated: state.name.name !== null
  }  
}
    
export default connect(mapStateToProps, null)(App);
