import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './component/Login';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('token') ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

ReactDOM.render(
  <Router >
    <div>
      <PrivateRoute path="/" component={App}/>
      <Route path="/login" component={Login}/>
    </div>
   </Router >,
  document.getElementById('root')
);
