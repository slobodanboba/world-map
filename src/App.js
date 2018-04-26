import React from 'react';
import Map from './components/Map';
import { Provider } from 'react-redux';
import configureStore from './components/store';
import './stylesheets/style.css';

const store = configureStore();

const App = () =>  (
          <Provider store={store}>
              <Map />
          </Provider>
    );

export default App;
