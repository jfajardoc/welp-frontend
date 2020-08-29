import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MapPage from './components/MapPage/MapPage';
import Login from './components/Login/Login';
import './globalStyles.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
        <Switch>
          <Route path='/home' component={MapPage}/>
          <Route path='/' component={Login}/>
        </Switch>
      </BrowserRouter>
    </Provider> 
  </React.StrictMode>,
  document.getElementById('root')
);