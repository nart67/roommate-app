import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SideNav from './components/SideNav/SideNav';
import { connect } from 'react-redux';
import { login } from './actions/auth';

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
        this.props.dispatch(login());
      }
    });
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <SideNav/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth
})

export default connect(mapStateToProps)(App);
