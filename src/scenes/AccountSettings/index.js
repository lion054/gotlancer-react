import React, { PureComponent } from 'react';
import {
  Box,
  CardActionArea,
  Card,
  CardContent,
  Grid,
  Link,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  card: {
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid'
  },
  cardContent: {
    height: theme.spacing(17)
  },
  icon: {
    width: theme.spacing(8),
    height: theme.spacing(7)
  }
})

class AccountSettings extends PureComponent {
  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2}>
        <Grid container>
          <Grid item md={2} />
          <Grid item md={8}>
            <Box mb={2}>
              <Typography variant="h5">Account Settings</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="body1">Apurba Das, designsfit@gmail.com · <Link href="#" style={{ color: this.props.theme.palette.success.main }}>Go to profile</Link></Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item lg={4} md={6} xs={12}>
                <Card elevation={0} className={this.props.classes.card}>
                  <CardActionArea onClick={() => this.props.history.push('/account_settings/personal_info')}>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../../assets/images/account-settings/personal-info.svg')} />
                      <Box display="flex" alignItems="center">
                        <Typography variant="subtitle2">Personal info</Typography>
                        <ChevronRight />
                      </Box>
                      <Typography variant="body2">Provide personal details and how we can reach you</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Card elevation={0} className={this.props.classes.card}>
                  <CardActionArea onClick={() => this.props.history.push('/account_settings/login_security')}>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../../assets/images/account-settings/login-info.svg')} />
                      <Box display="flex" alignItems="center">
                        <Typography variant="subtitle2">Login &amp; Security</Typography>
                        <ChevronRight />
                      </Box>
                      <Typography variant="body2">Update your email, password, mobile and secure your account</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Card elevation={0} className={this.props.classes.card}>
                  <CardActionArea onClick={() => this.props.history.push('/account_settings/payments_payouts')}>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../../assets/images/account-settings/payments-and-payouts.svg')} />
                      <Box display="flex" alignItems="center">
                        <Typography variant="subtitle2">Payments &amp; Payouts</Typography>
                        <ChevronRight />
                      </Box>
                      <Typography variant="body2">Review payments, payouts and taxes</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Card elevation={0} className={this.props.classes.card}>
                  <CardActionArea onClick={() => this.props.history.push('/account_settings/verify_identity')}>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../../assets/images/account-settings/verify-identity.svg')} />
                      <Box display="flex" alignItems="center">
                        <Typography variant="subtitle2">Verify identity</Typography>
                        <ChevronRight />
                      </Box>
                      <Typography variant="body2">Verify your identity for get paid from gotlancer and secured your account with Gotlancer.</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Card elevation={0} className={this.props.classes.card}>
                  <CardActionArea onClick={() => this.props.history.push('/account_settings/membership')}>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../../assets/images/account-settings/membership.svg')} />
                      <Box display="flex" alignItems="center">
                        <Typography variant="subtitle2">Membership</Typography>
                        <ChevronRight />
                      </Box>
                      <Typography variant="body2">Set your default language and timezone</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <CardActionArea>
                  <Card elevation={0} className={this.props.classes.card}>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../../assets/images/account-settings/business-account.svg')} />
                      <Box display="flex" alignItems="center">
                        <Typography variant="subtitle2">Business Account</Typography>
                        <ChevronRight />
                      </Box>
                      <Typography variant="body2">Manage your team, group chat, task share, large project management</Typography>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Card elevation={0} className={this.props.classes.card}>
                  <CardActionArea onClick={() => this.props.history.push('/account_settings/notifications')}>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../../assets/images/account-settings/notifications.svg')} />
                      <Box display="flex" alignItems="center">
                        <Typography variant="subtitle2">Notifications</Typography>
                        <ChevronRight />
                      </Box>
                      <Typography variant="body2">Choose notification preferences and how you want to be contacted</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Card elevation={0} className={this.props.classes.card}>
                  <CardActionArea onClick={() => this.props.history.push('/account_settings/global_preferences')}>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../../assets/images/account-settings/global-preferences.svg')} />
                      <Box display="flex" alignItems="center">
                        <Typography variant="subtitle2">Global preferences</Typography>
                        <ChevronRight />
                      </Box>
                      <Typography variant="body2">Set your default language and timezone</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Card elevation={0} className={this.props.classes.card}>
                  <CardActionArea onClick={() => this.props.history.push('/account_settings/invite_friends')}>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../../assets/images/account-settings/invite-friends.svg')} />
                      <Box display="flex" alignItems="center">
                        <Typography variant="subtitle2">Invite friends</Typography>
                        <ChevronRight />
                      </Box>
                      <Typography variant="body2">When they join and spend at least $100, you will get $30 instantly</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={2} />
        </Grid>
      </Box>
      <Box mt={8} mb={8} textAlign="center">
        <Typography variant="body2" color="textSecondary">Is there any problem? we can help</Typography>
        <Link href="#" style={{ color: this.props.theme.palette.success.main }}>Contact Support</Link>
      </Box>
      <Footer />
    </div>
  )
}

export default compose(
  withStyles(styles),
  withTheme,
  withRouter
)(AccountSettings);