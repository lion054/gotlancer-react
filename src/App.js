import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import './App.css';

import MyOverview from './scenes/MyOverview';

const routes = [{
  path: '/',
  component: MyOverview
}];

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      text: {
        textTransform: 'unset'
      }
    }
  }
});

class App extends PureComponent {
  render = () => (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            {routes.map(({ path, component }, index) => (
              <Route key={index} exact path={path} component={component} />
            ))}
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;