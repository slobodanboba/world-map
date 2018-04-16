import React, { Component } from 'react';
import Map from './components/Map';
import MovingDiv from './components/MovingDiv';
import CornerInfo from './components/CornerInfo';
import RecentList from './components/RecentList';
import logo from './logo.svg';
import './stylesheets/style.css';

const App = () =>  (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Map />
        <MovingDiv />
        <CornerInfo />
        <RecentList />
      </div>
    );

export default App;
