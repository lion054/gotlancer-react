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
import Profile from './scenes/Profile';
import PostProject from './scenes/PostProject';
import Membership from './scenes/Membership';
import Notifications from './scenes/Notifications';
import Projects from './scenes/Projects';
import Project from './scenes/Project';

import BuyBidCredit from './scenes/Finance/BuyBidCredit';
import Checkout from './scenes/Finance/BuyBidCredit/Checkout';
import DepositFund from './scenes/Finance/DepositFund';
import PaymentHistory from './scenes/Finance/PaymentHistory';
import Disputation from './scenes/Finance/Disputation';

import AddBank from './scenes/Settings/PaymentsPayouts/AddBank';
import AddBkash from './scenes/Settings/PaymentsPayouts/AddBkash';
import AddGst from './scenes/Settings/PaymentsPayouts/AddGst';
import AddNagad from './scenes/Settings/PaymentsPayouts/AddNagad';
import AddPan from './scenes/Settings/PaymentsPayouts/AddPan';
import AddPayPal from './scenes/Settings/PaymentsPayouts/AddPayPal';
import AddPayoneer from './scenes/Settings/PaymentsPayouts/AddPayoneer';
import AddSkrill from './scenes/Settings/PaymentsPayouts/AddSkrill';
import GlobalPreferences from './scenes/Settings/GlobalPreferences';
import InviteFriends from './scenes/Settings/InviteFriends';
import LoginSecurity from './scenes/Settings/LoginSecurity';
import SettingMembership from './scenes/Settings/Membership';
import SettingNotifications from './scenes/Settings/Notifications';
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
  path: '/deposit_fund',
  component: DepositFund
},{
  path: '/buy_bid_credit',
  component: BuyBidCredit
},{
  path: '/buy_bid_credit/checkout',
  component: Checkout
},{
  path: '/payment_history',
  component: PaymentHistory
},{
  path: '/profile',
  component: Profile
},{
  path: '/disputation',
  component: Disputation
},{
  path: '/post_project',
  component: PostProject
},{
  path: '/membership',
  component: Membership
},{
  path: '/projects',
  component: Projects
},{
  path: '/project',
  component: Project
},{
  path: '/notifications',
  component: Notifications
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
  path: '/settings/payments_payouts/add_bkash',
  component: AddBkash
},{
  path: '/settings/payments_payouts/add_gst',
  component: AddGst
},{
  path: '/settings/payments_payouts/add_nagad',
  component: AddNagad
},{
  path: '/settings/payments_payouts/add_pan',
  component: AddPan
},{
  path: '/settings/payments_payouts/add_paypal',
  component: AddPayPal
},{
  path: '/settings/payments_payouts/add_payoneer',
  component: AddPayoneer
},{
  path: '/settings/payments_payouts/add_skrill',
  component: AddSkrill
},{
  path: '/settings/verify_identity',
  component: VerifyIdentity
},{
  path: '/settings/membership',
  component: SettingMembership
},{
  path: '/settings/notifications',
  component: SettingNotifications
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