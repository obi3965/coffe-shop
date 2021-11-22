import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
 import { Provider } from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import Routes from './Routes';
import {transitions, positions, Provider as ProviderAlert} from 'react-alert'
import AlertTemplate from "react-alert-template-basic";
import 'antd/dist/antd.css'

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE
};

ReactDOM.render(
 
  <Provider store={store}>
   <ProviderAlert template={AlertTemplate} {...options}>
    
    <Routes/>
    </ProviderAlert>
    
  </Provider>,
  
 
  document.getElementById('root')
);