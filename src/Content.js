import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import MyOverview from './scenes/MyOverview';
import { connect } from 'react-redux';

const routes = [{
  path: '/',
  component: MyOverview
}];

const lightTheme = createMuiTheme({
  palette: {
    type: 'light'
  },
  overrides: {
    MuiButton: {
      text: {
        textTransform: 'unset'
      }
    }
  }
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  overrides: {
    MuiButton: {
      text: {
        textTransform: 'unset'
      }
    }
  }
});

class Content extends PureComponent {
  render = () => (
    <ThemeProvider theme={this.props.themeMode === 'dark' ? darkTheme : lightTheme}>
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

const mapStateToProps = ({
  app: { themeMode }
}) => ({
  themeMode
});

export default connect(mapStateToProps)(Content);