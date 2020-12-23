import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { connect } from 'react-redux';

import AccountSettings from './scenes/AccountSettings';
import Home from './scenes/Home';
import GlobalPreferences from './scenes/AccountSettings/GlobalPreferences';
import IdentityVerification from './scenes/AccountSettings/IdentityVerification';
import LoginSecurity from './scenes/AccountSettings/LoginSecurity';
import Membership from './scenes/AccountSettings/Membership';
import Notifications from './scenes/AccountSettings/Notifications';
import PaymentsPayouts from './scenes/AccountSettings/PaymentsPayouts';
import PersonalInfo from './scenes/AccountSettings/PersonalInfo';

import { darkTheme, lightTheme } from './themes';

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
},{
  path: '/account_settings/notifications',
  component: Notifications
},{
  path: '/account_settings/global_preferences',
  component: GlobalPreferences
}];

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