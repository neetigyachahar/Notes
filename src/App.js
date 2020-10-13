import React, { Component } from 'react';
import './App.css';

import Login from './Components/Login/Login';
import Home from './Components/Home/Home';

import axios from 'axios';

class App extends Component {

  state = {
    logged: localStorage.getItem('user') !== null ? true : false
  }

  componentDidMount() {
    if (this.state.logged) {
      this.setRefreshTokenLoop();
    }
  }

  loginSuccessHandler = () => {
    this.setState({
      logged: true
    });
    this.setRefreshTokenLoop(true);
  }

  setRefreshTokenLoop = async loginMethod => {

    if (!loginMethod) {
      await this.getNewTokens();
    }

    setInterval(async () => {
      await this.getNewTokens();
    }
      , 60 * 1000);

  }

  getNewTokens = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      console.log(user.refreshToken);

      const data = {
        refreshToken: `Bearer ${user.refreshToken}`
      }

      const url = "https://hot-snail-4.loca.lt/auth/newtokens";

      const reply = await axios.post(url, data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        });

      user.refreshToken = reply.data.refreshToken;
      user.accessToken = reply.data.accessToken;

      localStorage.setItem('user', JSON.stringify(user));

    } catch (err) {
      alert('Some error occured. Please refresh the page or try after sometime.');
      console.log(err);
    }
  }

  render() {
    let user = JSON.parse(localStorage.getItem('user'))
    let name;
    let username;

    if (this.state.logged) {
      name = user.name;
      username = user.username;
    }

    return (
      <div className="App" >
        {
          this.state.logged ?
            <Home name={name} username={username} />
            :
            <Login loginSuccess={this.loginSuccessHandler} />
        }
      </div>
    );
  }
}

export default App;