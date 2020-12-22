import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { colors, createMuiTheme, ThemeProvider } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import AccountSettings from './scenes/AccountSettings';
import Home from './scenes/Home';
import IdentityVerification from './scenes/IdentityVerification';
import LoginSecurity from './scenes/LoginSecurity';
import Membership from './scenes/Membership';
import PaymentsPayouts from './scenes/PaymentsPayouts';
import PersonalInfo from './scenes/PersonalInfo';
import { connect } from 'react-redux';

const routes = [{
  path: '/',
  component: Home
},{
  path: '/account_settings',
  component: AccountSettings
},{
  path: '/account_settings/personal_info',
  component: PersonalInfo
},{
  path: '/account_settings/login_security',
  component: LoginSecurity
},{
  path: '/account_settings/payments_payouts',
  component: PaymentsPayouts
},{
  path: '/account_settings/identity_verification',
  component: IdentityVerification
},{
  path: '/account_settings/membership',
  component: Membership
}];

const lightTheme = createMuiTheme({
  palette: {
    type: 'light'
  },
  overrides: {
    MuiButton: {
      text: {
        textTransform: 'unset'
      },
      contained: {
        textTransform: 'unset',
        backgroundColor: colors.grey[900],
        color: colors.common.white,
        '&:hover': {
          backgroundColor: colors.grey[600]
        }
      },
      outlined: {
        textTransform: 'unset'
      }
    },
    MuiOutlinedInput: {
      root: {
        '&:hover $notchedOutline': {
          borderColor: colors.green[300]
        },
        '&$focused $notchedOutline': {
          borderColor: colors.green[500]
        }
      }
    },
    MuiInputLabel: {
      outlined: {
        '&$shrink': {
          color: colors.green[500]
        }
      }
    },
    MuiTab: {
      textColorInherit: {
        color: 'rgba(0, 0, 0, 0.87)',
        '&$selected': {
          color: colors.green[500]
        }
      }
    },
    MuiTabs: {
      indicator: {
        backgroundColor: colors.green[500]
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
      },
      contained: {
        textTransform: 'unset',
        backgroundColor: colors.grey[900],
        color: colors.common.white,
        '&:hover': {
          backgroundColor: colors.grey[600]
        }
      },
      outlined: {
        textTransform: 'unset'
      }
    },
    MuiOutlinedInput: {
      root: {
        '&:hover $notchedOutline': {
          borderColor: colors.green[300]
        },
        '&$focused $notchedOutline': {
          borderColor: colors.green[500]
        }
      }
    },
    MuiInputLabel: {
      outlined: {
        '&$shrink': {
          color: colors.green[500]
        }
      }
    },
    MuiTab: {
      textColorInherit: {
        color: colors.common.white,
        '&$selected': {
          color: colors.green[500]
        }
      }
    },
    MuiTabs: {
      indicator: {
        backgroundColor: colors.green[500]
      }
    }
  }
});

class Content extends PureComponent {
  render = () => (
    <ThemeProvider theme={this.props.themeMode === 'dark' ? darkTheme : lightTheme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              {routes.map(({ path, component }, index) => (
                <Route key={index} exact path={path} component={component} />
              ))}
            </Switch>
          </div>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}

const mapStateToProps = ({
  app: { themeMode }
}) => ({
  themeMode
});

export default connect(mapStateToProps)(Content);