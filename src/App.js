import React, { Component } from 'react';
import Map from './components/Map';
import MovingDiv from './components/MovingDiv';
import CornerInfo from './components/CornerInfo';
import RecentList from './components/RecentList';
import logo from './logo.svg';
import './stylesheets/style.css';

const App = () =>  (
      <div>
        <Map />
        <MovingDiv />
        <CornerInfo />
        <RecentList />
      </div>
    );

export default App;
