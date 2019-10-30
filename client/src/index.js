import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import {Provider} from './Components/Context/Context';


ReactDOM.render(
  <Provider>
  <App />
  </Provider>
  , document.getElementById('root'));
