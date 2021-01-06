import React, { PureComponent } from 'react';
import {
  Box,
  CardActionArea,
  CardContent,
  Grid,
  Link,
  Typography,
  withStyles
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CompactCard } from '../../global';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  card: {
    height: theme.spacing(21)
  },
  cardAction: {
    height: '100%'
  },
  icon: {
    width: theme.spacing(8),
    height: theme.spacing(7)
  }
})

class Settings extends PureComponent {
  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8}>
            <Box mb={2}>
              <Typography variant="h5">Settings</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="body1">Apurba Das, designsfit@gmail.com · <Link href="#">Go to profile</Link></Typography>
            </Box>
            <Box m={-2}>
              <Grid container>
                <Grid item md={4} sm={6} xs={12}>
                  <Box p={2}>
                    <CompactCard className={this.props.classes.card}>
                      <CardActionArea className={this.props.classes.cardAction} onClick={() => this.props.history.push('/settings/personal_info')}>
                        <CardContent>
                          <img alt="" className={this.props.classes.icon} src={require('../../assets/images/settings/personal-info.svg')} />
                          <Box display="flex" alignItems="center">
                            <Typography variant="subtitle2">Personal info</Typography>
                            <ChevronRight />
                          </Box>
                          <Typography variant="body2">Provide personal details and how we can reach you</Typography>
                        </CardContent>
                      </CardActionArea>
                    </CompactCard>
                  </Box>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <Box p={2}>
                    <CompactCard className={this.props.classes.card}>
                      <CardActionArea className={this.props.classes.cardAction} onClick={() => this.props.history.push('/settings/login_security')}>
                        <CardContent>
                          <img alt="" className={this.props.classes.icon} src={require('../../assets/images/settings/login-info.svg')} />
                          <Box display="flex" alignItems="center">
                            <Typography variant="subtitle2">Login &amp; Security</Typography>
                            <ChevronRight />
                          </Box>
                          <Typography variant="body2">Update your email, password, mobile and secure your account</Typography>
                        </CardContent>
                      </CardActionArea>
                    </CompactCard>
                  </Box>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <Box p={2}>
                    <CompactCard className={this.props.classes.card}>
                      <CardActionArea className={this.props.classes.cardAction} onClick={() => this.props.history.push('/settings/payments_payouts')}>
                        <CardContent>
                          <img alt="" className={this.props.classes.icon} src={require('../../assets/images/settings/payments-and-payouts.svg')} />
                          <Box display="flex" alignItems="center">
                            <Typography variant="subtitle2">Payments &amp; Payouts</Typography>
                            <ChevronRight />
                          </Box>
                          <Typography variant="body2">Review payments, payouts and taxes</Typography>
                        </CardContent>
                      </CardActionArea>
                    </CompactCard>
                  </Box>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <Box p={2}>
                    <CompactCard className={this.props.classes.card}>
                      <CardActionArea className={this.props.classes.cardAction} onClick={() => this.props.history.push('/settings/verify_identity')}>
                        <CardContent>
                          <img alt="" className={this.props.classes.icon} src={require('../../assets/images/settings/verify-identity.svg')} />
                          <Box display="flex" alignItems="center">
                            <Typography variant="subtitle2">Verify identity</Typography>
                            <ChevronRight />
                          </Box>
                          <Typography variant="body2">Verify your identity for get paid from gotlancer and secured your account with Gotlancer.</Typography>
                        </CardContent>
                      </CardActionArea>
                    </CompactCard>
                  </Box>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <Box p={2}>
                    <CompactCard className={this.props.classes.card}>
                      <CardActionArea className={this.props.classes.cardAction} onClick={() => this.props.history.push('/settings/membership')}>
                        <CardContent>
                          <img alt="" className={this.props.classes.icon} src={require('../../assets/images/settings/membership.svg')} />
                          <Box display="flex" alignItems="center">
                            <Typography variant="subtitle2">Membership</Typography>
                            <ChevronRight />
                          </Box>
                          <Typography variant="body2">Set your default language and timezone</Typography>
                        </CardContent>
                      </CardActionArea>
                    </CompactCard>
                  </Box>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <Box p={2}>
                    <CompactCard className={this.props.classes.card}>
                      <CardActionArea className={this.props.classes.cardAction}>
                        <CardContent>
                          <img alt="" className={this.props.classes.icon} src={require('../../assets/images/settings/business-account.svg')} />
                          <Box display="flex" alignItems="center">
                            <Typography variant="subtitle2">Business Account</Typography>
                            <ChevronRight />
                          </Box>
                          <Typography variant="body2">Manage your team, group chat, task share, large project management</Typography>
                        </CardContent>
                      </CardActionArea>
                    </CompactCard>
                  </Box>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <Box p={2}>
                    <CompactCard className={this.props.classes.card}>
                      <CardActionArea className={this.props.classes.cardAction} onClick={() => this.props.history.push('/settings/notifications')}>
                        <CardContent>
                          <img alt="" className={this.props.classes.icon} src={require('../../assets/images/settings/notifications.svg')} />
                          <Box display="flex" alignItems="center">
                            <Typography variant="subtitle2">Notifications</Typography>
                            <ChevronRight />
                          </Box>
                          <Typography variant="body2">Choose notification preferences and how you want to be contacted</Typography>
                        </CardContent>
                      </CardActionArea>
                    </CompactCard>
                  </Box>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <Box p={2}>
                    <CompactCard className={this.props.classes.card}>
                      <CardActionArea className={this.props.classes.cardAction} onClick={() => this.props.history.push('/settings/global_preferences')}>
                        <CardContent>
                          <img alt="" className={this.props.classes.icon} src={require('../../assets/images/settings/global-preferences.svg')} />
                          <Box display="flex" alignItems="center">
                            <Typography variant="subtitle2">Global preferences</Typography>
                            <ChevronRight />
                          </Box>
                          <Typography variant="body2">Set your default language and timezone</Typography>
                        </CardContent>
                      </CardActionArea>
                    </CompactCard>
                  </Box>
                </Grid>
                <Grid item md={4} sm={6} xs={12}>
                  <Box p={2}>
                    <CompactCard className={this.props.classes.card}>
                      <CardActionArea className={this.props.classes.cardAction} onClick={() => this.props.history.push('/settings/invite_friends')}>
                        <CardContent>
                          <img alt="" className={this.props.classes.icon} src={require('../../assets/images/settings/invite-friends.svg')} />
                          <Box display="flex" alignItems="center">
                            <Typography variant="subtitle2">Invite friends</Typography>
                            <ChevronRight />
                          </Box>
                          <Typography variant="body2">When they join and spend at least $100, you will get $30 instantly</Typography>
                        </CardContent>
                      </CardActionArea>
                    </CompactCard>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Box mt={8} mb={8} textAlign="center">
        <Typography variant="body2" color="textSecondary">Is there any problem? We can help</Typography>
        <Link href="#">Contact Support</Link>
      </Box>
      <Footer />
    </div>
  )
}

export default compose(
  withStyles(styles),
  withRouter
)(Settings);