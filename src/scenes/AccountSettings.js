import React, { PureComponent } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Link,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';

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
    height: theme.spacing(16)
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
            <Typography variant="h5" color="textPrimary">Account Settings</Typography>
            <Typography variant="body1" color="textPrimary">Apurba Das, designsfit@gmail.com · <Link href="#" style={{ color: this.props.theme.palette.success.main }}>Go to profile</Link></Typography>
            <Grid container spacing={2}>
              <Grid item lg={4} md={6} xs={12}>
                <Card className={this.props.classes.card}>
                  <CardActionArea>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../assets/images/account-settings/personal-info.svg')} />
                      <Typography variant="body1">Personal info &gt;</Typography>
                      <Typography variant="body2">Provide personal details and how we can reach you</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Card className={this.props.classes.card}>
                  <CardActionArea>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../assets/images/account-settings/login-info.svg')} />
                      <Typography variant="body1">Login &amp; Security &gt;</Typography>
                      <Typography variant="body2">Update your email, password, mobile and secure your account</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Card className={this.props.classes.card}>
                  <CardActionArea>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../assets/images/account-settings/payment-and-payouts.svg')} />
                      <Typography variant="body1">Payments &amp; Payouts &gt;</Typography>
                      <Typography variant="body2">Review payments, payouts and taxes</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Card className={this.props.classes.card}>
                  <CardActionArea>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../assets/images/account-settings/verify-identity.svg')} />
                      <Typography variant="body1">Verify identity &gt;</Typography>
                      <Typography variant="body2">Verify your identity for get paid from gotlancer and secured your account with Gotlancer.</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Card className={this.props.classes.card}>
                  <CardActionArea>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../assets/images/account-settings/membership.svg')} />
                      <Typography variant="body1">Membership &gt;</Typography>
                      <Typography variant="body2">Set your default language and timezone</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Card className={this.props.classes.card}>
                  <CardActionArea>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../assets/images/account-settings/business-account.svg')} />
                      <Typography variant="body1">Business Account &gt;</Typography>
                      <Typography variant="body2">Manage your team, group chat, task share, large project management</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Card className={this.props.classes.card}>
                  <CardActionArea>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../assets/images/account-settings/notifications.svg')} />
                      <Typography variant="body1">Notifications &gt;</Typography>
                      <Typography variant="body2">Choose notification preferences and how you want to be contacted</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Card className={this.props.classes.card}>
                  <CardActionArea>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../assets/images/account-settings/global-preferences.svg')} />
                      <Typography variant="body1">Global preferences &gt;</Typography>
                      <Typography variant="body2">Set your default language and timezone</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Card className={this.props.classes.card}>
                  <CardActionArea>
                    <CardContent className={this.props.classes.cardContent}>
                      <img alt="" className={this.props.classes.icon} src={require('../assets/images/account-settings/invite-friends.svg')} />
                      <Typography variant="body1">Invite friends &gt;</Typography>
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
  withTheme
)(AccountSettings);