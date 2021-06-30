import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from "@material-ui/core";
import App from './App';

import { icons } from './assets/icons'

import { Provider } from 'react-redux'
import store from './reducer/store'
import reportWebVitals from './reportWebVitals';

import { AuthProvider } from './context/auth'
import { Globalstyled } from "./GlobalStyle";
import theme from './theme';

React.icons = icons

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Globalstyled />
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <AuthProvider persistKey='auth'>
            <App />
          </AuthProvider>
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
reportWebVitals();
