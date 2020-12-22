import React, { PureComponent } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import MuiPhoneNumber from 'material-ui-phone-number';
import moment from 'moment';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingButton from '../components/LoadingButton';
import OtpInput from '../components/otp';
import ResendTimer from '../components/otp/ResendTimer';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  expandIcon: { // Avoid rotation of collapse icon
    '&$expanded': {
      transform: 'unset'
    }
  },
  expanded: {}, // Avoid rotation of collapse icon
  card: {
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid'
  },
  cardIcon: {
    width: theme.spacing(8),
    height: theme.spacing(7)
  },
  otpDigit: {
    borderRadius: 5,
    fontSize: theme.spacing(3),
    borderColor: theme.palette.action.disabled,
    borderStyle: 'solid',
    borderWidth: 2,
    '&:focus': {
      borderRadius: 5,
      outlineColor: 'transparent',
      outlineStyle: 'solid',
      outlineWidth: 0,
      borderColor: theme.palette.success.main,
      borderStyle: 'solid',
      borderWidth: 2
    }
  },
  resendOtp: {
    color: theme.palette.success.main,
    fontWeight: 'bold'
  },
  remainingTime: {
    marginLeft: theme.spacing(1),
    color: theme.palette.error.main
  }
})

class LoginSecurity extends PureComponent {
  state = {
    currentEntry: '',
    currentPassword: '',
    currentPasswordType: 'password',
    newPassword: '',
    newPasswordType: 'password',
    passwordConfirmation: '',
    passwordConfirmationType: 'password',
    emailAddress: '',
    emailPassword: '',
    emailPasswordType: 'password',
    phoneNumber: '',
    loading: false,
    acquiringOtp: false,
    otpText: '',
    verifyingOtp: false
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item md={2} />
          <Grid item md={8}>
            <Box mb={2}>
              <Breadcrumbs aria-label="breadcrumb" separator=">">
                <Link color="inherit" href="/account_settings">Account</Link>
                <Typography variant="body2" color="textSecondary">Login &amp; Security</Typography>
              </Breadcrumbs>
            </Box>
            <Box mb={2}>
              <Typography variant="h5" color="textPrimary">Login &amp; Security</Typography>
            </Box>
            <Grid container>
              <Grid item lg={6}>
                {this.renderEntry({
                  id: 'Password',
                  title: 'Password',
                  formattedValue: `Last updated ${moment([2018, 2, 25]).fromNow()}`,
                  details: (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          label="Current password"
                          type={this.state.currentPasswordType}
                          value={this.state.currentPassword}
                          onChange={e => this.setState({ currentPassword: e.target.value })}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <IconButton onClick={() => {
                                if (this.state.currentPasswordType === 'password') {
                                  this.setState({ currentPasswordType: 'text' });
                                } else {
                                  this.setState({ currentPasswordType: 'password' });
                                }
                              }}>
                                <FontAwesomeIcon
                                  icon={this.state.currentPasswordType === 'password' ? faEye : faEyeSlash}
                                  color={this.props.theme.palette.text.secondary}
                                  size="1x"
                                />
                              </IconButton>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          label="New password"
                          type={this.state.newPasswordType}
                          value={this.state.newPassword}
                          onChange={e => this.setState({ newPassword: e.target.value })}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <IconButton onClick={() => {
                                if (this.state.newPasswordType === 'password') {
                                  this.setState({ newPasswordType: 'text' });
                                } else {
                                  this.setState({ newPasswordType: 'password' });
                                }
                              }}>
                                <FontAwesomeIcon
                                  icon={this.state.newPasswordType === 'password' ? faEye : faEyeSlash}
                                  color={this.props.theme.palette.text.secondary}
                                  size="1x"
                                />
                              </IconButton>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          label="Confirm new password"
                          type={this.state.passwordConfirmationType}
                          value={this.state.passwordConfirmation}
                          onChange={e => this.setState({ passwordConfirmation: e.target.value })}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <IconButton onClick={() => {
                                if (this.state.passwordConfirmationType === 'password') {
                                  this.setState({ passwordConfirmationType: 'text' });
                                } else {
                                  this.setState({ passwordConfirmationType: 'password' });
                                }
                              }}>
                                <FontAwesomeIcon
                                  icon={this.state.passwordConfirmationType === 'password' ? faEye : faEyeSlash}
                                  color={this.props.theme.palette.text.secondary}
                                  size="1x"
                                />
                              </IconButton>
                            )
                          }}
                        />
                      </Grid>
                    </Grid>
                  )
                })}
                {this.renderEntry({
                  id: 'Email',
                  title: 'Email',
                  formattedValue: this.state.emailAddress,
                  details: (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          label="Enter your new email"
                          value={this.state.emailAddress}
                          onChange={e => this.setState({ emailAddress: e.target.value })}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          label="Enter email password"
                          type={this.state.emailPasswordType}
                          value={this.state.emailPassword}
                          onChange={e => this.setState({ emailPassword: e.target.value })}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <IconButton onClick={() => {
                                if (this.state.emailPasswordType === 'password') {
                                  this.setState({ emailPasswordType: 'text' });
                                } else {
                                  this.setState({ emailPasswordType: 'password' });
                                }
                              }}>
                                <FontAwesomeIcon
                                  icon={this.state.emailPasswordType === 'password' ? faEye : faEyeSlash}
                                  color={this.props.theme.palette.text.secondary}
                                  size="1x"
                                />
                              </IconButton>
                            )
                          }}
                        />
                      </Grid>
                    </Grid>
                  )
                })}
                {this.renderMobileEntry()}
              </Grid>
              <Grid item lg={2} />
              <Grid item lg={4}>
                <Card className={this.props.classes.card}>
                  <CardContent>
                    <img alt="" className={this.props.classes.cardIcon} src={require('../assets/images/account-settings/login-info.svg')} />
                    <Typography variant="body1">Let's make your account more secure</Typography>
                    <Typography variant="body2">Your account security: Medium</Typography>
                    <Typography variant="body2">We’re always working on ways to increase safety in our community. That’s why we look at every account to make sure it’s as secure as possible.</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
  )

  getExpandIcon(id) {
    let color = this.props.theme.palette.action.disabled;
    if (this.state.currentEntry === '') {
      color = this.props.theme.palette.success.main;
    } else if (this.state.currentEntry === id) {
      color = this.props.theme.palette.success.main;
    }
    return (
      <Typography variant="body2" style={{ color }}>{this.state.currentEntry === id ? 'Cancel' : 'Edit'}</Typography>
    );
  }

  renderEntry = ({ id, title, formattedValue, details }) => (
    <Accordion expanded={this.state.currentEntry === id}>
      <AccordionSummary
        expandIcon={this.getExpandIcon(id)}
        classes={{
          expandIcon: this.props.classes.expandIcon, // Avoid rotation of collapse icon
          expanded: this.props.classes.expanded // Avoid rotation of collapse icon
        }}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        onClick={() => {
          if (this.state.currentEntry === id) {
            this.setState({ currentEntry: '' });
          } else {
            this.setState({ currentEntry: id });
          }
        }}
      >
        <Box>
          <Typography variant="subtitle1">{title}</Typography>
          {this.state.currentEntry !== id && (
            <Typography variant="body1">{formattedValue}</Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box width="100%">
          {details}
          <Box mt={2}>
            <LoadingButton
              variant="contained"
              size="large"
              title="Save"
              loading={this.state.currentEntry === id && this.state.loading}
              onClick={() => {
                this.setState({ loading: true });
                setTimeout(() => this.setState({ loading: false, currentEntry: '' }), 3000);
              }}
            />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )

  renderMobileEntry = () => (
    <Accordion expanded={this.state.currentEntry === 'Mobile'}>
      <AccordionSummary
        expandIcon={this.getExpandIcon('Mobile')}
        classes={{
          expandIcon: this.props.classes.expandIcon, // Avoid rotation of collapse icon
          expanded: this.props.classes.expanded // Avoid rotation of collapse icon
        }}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        onClick={() => {
          if (this.state.currentEntry === 'Mobile') {
            this.setState({ currentEntry: '' });
          } else {
            this.setState({ currentEntry: 'Mobile' });
          }
        }}
      >
        <Box>
          <Typography variant="subtitle1">Mobile</Typography>
          {this.state.currentEntry !== 'Mobile' && (
            <Typography variant="body1">Mobile not added</Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box width="100%">
          <Box>
            <MuiPhoneNumber
              variant="outlined"
              defaultCountry="us"
              onChange={(phoneNumber) => this.setState({ phoneNumber })}
            />
          </Box>
          <Box mt={2}>
            <LoadingButton
              variant="contained"
              size="large"
              title="Send OTP"
              loading={this.state.acquiringOtp}
              onClick={() => {
                this.setState({ acquiringOtp: true });
                setTimeout(() => this.setState({ acquiringOtp: false }), 3000);
              }}
            />
          </Box>
          <Box mt={2}>
            <Typography variant="body2" color="textSecondary">After click on Sent OTP this screen will come (this another logic)</Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="body2" color="textPrimary">We texted your code to +91 98 000 00 000. It may take a minute to arrive.</Typography>
          </Box>
          <Box mt={2}>
            <OtpInput
              numDigits={5}
              autoFocus
              digitCls={this.props.classes.otpDigit}
              value={this.state.otpText}
              onChange={(otpText) => this.setState({ otpText })}
            />
            <Box mt={2} display="flex" alignItems="center">
              <Typography variant="body2" color="textSecondary">Did not yet receive OTP?</Typography>
              <ResendTimer
                renderButton={({ disabled, onClick, remainingTime }) => (
                  <Box ml={1} display="flex" alignItems="center">
                    <Button variant="outlined" disabled={disabled} onClick={onClick} className={this.props.classes.resendOtp}>Resend OTP</Button>
                    <Box ml={1}>
                      <FontAwesomeIcon icon={faCircle} color={this.props.theme.palette.error.main} size="1x" />
                      <Typography variant="body2" display="inline" className={this.props.classes.remainingTime}>{remainingTime} sec</Typography>
                    </Box>
                  </Box>
                )}
                renderTime={(remainingTime) => (
                  <div />
                )}
                onResendClick={() => console.log("Resend clicked")}
                style={{ display: 'inline' }}
              />
            </Box>
          </Box>
          <Box mt={2}>
            <LoadingButton
              variant="contained"
              size="large"
              title="Confirm OTP"
              loading={this.state.verifyingOtp}
              onClick={() => {
                this.setState({ verifyingOtp: true });
                setTimeout(() => this.setState({ verifyingOtp: false, currentEntry: '' }), 3000);
              }}
            />
          </Box>
          <Box mt={2}>
            <Typography variant="body2" color="textSecondary">Success screen (another screen)</Typography>
          </Box>
          <Box mt={2} display="flex" alignItems="center">
            <FontAwesomeIcon icon={faCheckCircle} color={this.props.theme.palette.success.main} size="1x" />
            <Box ml={1}>
              <Typography variant="body2" color="textPrimary" display="inline">Your mobile number added successfully</Typography>
            </Box>
          </Box>
          <Box mt={2}>
            <Typography variant="body2" color="textSecondary">this screen will come finally</Typography>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(LoginSecurity);