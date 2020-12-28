import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { connect } from 'react-redux';

import Settings from './scenes/Settings';
import FindWork from './scenes/FindWork';
import BuyerHome from './scenes/BuyerHome';
import Messenger from './scenes/Messenger';

import AddBank from './scenes/Settings/PaymentsPayouts/AddBank';
import GlobalPreferences from './scenes/Settings/GlobalPreferences';
import InviteFriends from './scenes/Settings/InviteFriends';
import LoginSecurity from './scenes/Settings/LoginSecurity';
import Membership from './scenes/Settings/Membership';
import Notifications from './scenes/Settings/Notifications';
import PaymentsPayouts from './scenes/Settings/PaymentsPayouts';
import PersonalInfo from './scenes/Settings/PersonalInfo';
import VerifyIdentity from './scenes/Settings/VerifyIdentity';

import { darkTheme, lightTheme } from './themes';
import ScrollToTop from './components/ScrollToTop';

const routes = [{
  path: '/',
  component: BuyerHome
},{
  path: '/find_work',
  component: FindWork
},{
  path: '/settings',
  component: Settings
},{
  path: '/settings/personal_info',
  component: PersonalInfo
},{
  path: '/settings/login_security',
  component: LoginSecurity
},{
  path: '/settings/payments_payouts',
  component: PaymentsPayouts
},{
  path: '/settings/payments_payouts/add_bank',
  component: AddBank
},{
  path: '/settings/verify_identity',
  component: VerifyIdentity
},{
  path: '/settings/membership',
  component: Membership
},{
  path: '/settings/notifications',
  component: Notifications
},{
  path: '/settings/global_preferences',
  component: GlobalPreferences
},{
  path: '/settings/invite_friends',
  component: InviteFriends
},{
  path: '/messenger',
  component: Messenger
}];

class Content extends PureComponent {
  render = () => (
    <ThemeProvider theme={this.props.themeMode === 'dark' ? darkTheme : lightTheme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <BrowserRouter>
          <ScrollToTop />
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