import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PublicRouter from './routes/PublicRouter';
import ProtectRouter from './routes/ProtectRouter';

import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
// Pages
const Login = React.lazy(() => import('./components/login/Login'));

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <PublicRouter exact path="/login" name="Login" component={Login} />
            <ProtectRouter path="/" name="Home" component={TheLayout} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
