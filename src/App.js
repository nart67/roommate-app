import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SideNav from './components/SideNav/SideNav';
import AppRouter from './routers/AppRouter';
import { connect } from 'react-redux';
import './actions/';

class App extends Component {
  constructor(props) {
    super(props);
    this.checkLogin = this.checkLogin.bind(this);
    this.checkLogin();
  }

  checkLogin() {
    fetch('/checkAuth/', {
      credentials: 'same-origin'
    })
    .then(response => {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        this.props.dispatch({ type: 'LOGIN' });
      }
    });
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <SideNav/>
        <AppRouter/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth
})

export default connect(mapStateToProps)(App);
