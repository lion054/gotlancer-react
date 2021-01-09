import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
  OutlinedInput,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import {
  AttachMoney,
  CheckCircle,
  ChevronLeft,
  CreditCard,
  DesktopMac,
  Email,
  PhoneAndroid,
  Stars,
  WatchLater
} from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import FileUpload from '../components/FileUpload';
import { CompactCard, formatCurrency } from '../global';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  outerMargin: {
    margin: theme.spacing(-2),
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(-1)
    }
  },
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  },
  saveIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  sideIcon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1)
  }
});

class ApplyJob extends PureComponent {
  state = {
    address: {
      country: {
        iso2: 'us',
        name: 'United States'
      }
    }
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mx={2} my={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box mb={2}>
              <Button variant="text" startIcon={<ChevronLeft />} onClick={() => this.props.history.goBack()}>Back to job details</Button>
            </Box>
            <Box className={this.props.classes.outerMargin}>
              <Grid container>
                <Grid item md={9} xs={12}>
                  <Box className={this.props.classes.innerPadding}>
                    <CompactCard>
                      <CardContent>
                        <Typography variant="h6">Apply Terms</Typography>
                        <Box mt={2}>
                          <Typography variant="body2">This proposal requires 1 bids</Typography>
                          <Typography variant="body2">We will deducted 1 bids from your wally after apply on this project</Typography>
                        </Box>
                        <Box mt={2}>
                          <Grid container>
                            <Grid item md={9} xs={12}>
                              <Typography variant="body2">Your Bid Amount</Typography>
                              <Typography variant="body2">Client will see this amountation your bid</Typography>
                            </Grid>
                            <Grid item md={3} xs={12}>
                              <OutlinedInput
                                fullWidth
                                margin="dense"
                                startAdornment={(
                                  <InputAdornment position="start">
                                    <AttachMoney />
                                  </InputAdornment>
                                )}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                        <Box mt={2}>
                          <Grid container>
                            <Grid item md={9} xs={12}>
                              <Typography variant="body2">Gotlancer Service fee</Typography>
                              <Typography variant="body2">See our <Link href="#">Fees And Changes</Link></Typography>
                            </Grid>
                            <Grid item md={3} xs={12}>
                              <Typography variant="body1">{formatCurrency(0)}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box mt={2}>
                          <Grid container>
                            <Grid item md={9} xs={12}>
                              <Typography variant="body2">You will receives</Typography>
                              <Typography variant="body2">The estimated amount you'll receive after service fees</Typography>
                            </Grid>
                            <Grid item md={3} xs={12}>
                              <Typography variant="body1">{formatCurrency(0)}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box mt={2}>
                          <Grid container>
                            <Grid item md={9} xs={12}>
                              <Typography variant="body2">When you can deliverd this project</Typography>
                              <Typography variant="body2">The estimated days you can delivery this project</Typography>
                            </Grid>
                            <Grid item md={3} xs={12}>
                              <OutlinedInput
                                fullWidth
                                margin="dense"
                                endAdornment={(
                                  <Typography variant="body2">Days</Typography>
                                )}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                        <Box mt={2}>
                          <Typography variant="body2">Your cover Letter</Typography>
                          <Typography variant="body2">Provide a interesting proposal letter after carefully read the project details.</Typography>
                        </Box>
                        <OutlinedInput
                          fullWidth
                          margin="dense"
                          multiline
                          rows={5}
                        />
                        <Box my={1}>
                          <Typography variant="body2">Previous Work Samples (Optional)</Typography>
                        </Box>
                        <FileUpload />
                        <Box my={2}>
                          <FormControlLabel
                            control={(
                              <Checkbox onClick={(e) => e.stopPropagation()} />
                            )}
                            label={<Typography variant="body2">I accept the <Link href="#">project apply terms and conditions</Link></Typography>}
                            onClick={() => {}}
                          />
                        </Box>
                        <Button variant="contained" size="large">Apply Now</Button>
                      </CardContent>
                    </CompactCard>
                  </Box>
                </Grid>
                <Grid item md={3} xs={12}>
                  <Box className={this.props.classes.innerPadding}>
                    <CompactCard>
                      <CardContent>
                        <Box mb={2}>
                          <Typography variant="h6">Bid credit</Typography>
                        </Box>
                        <Box mb={1}>
                          <Typography variant="body2">Your available bids</Typography>
                        </Box>
                        <Box mb={2} color={this.props.theme.palette.success.main}>
                          <Typography variant="body2">53</Typography>
                        </Box>
                        <Button fullWidth variant="outlined">Buy bid credit</Button>
                      </CardContent>
                    </CompactCard>
                  </Box>
                  <Box className={this.props.classes.innerPadding}>
                    <CompactCard>
                      <CardContent>
                        <Box mb={2}>
                          <Typography variant="h6">Employer Verification</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <Email className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.success.main} />
                          <Typography variant="body2">Email Vertification</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <CheckCircle className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.action.active} />
                          <Typography variant="body2">KYC Verification</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <CreditCard className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.success.main} />
                          <Typography variant="body2">Payment Verification</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <PhoneAndroid className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.action.active} />
                          <Typography variant="body2">Mobile Verification</Typography>
                        </Box>
                      </CardContent>
                    </CompactCard>
                  </Box>
                  <Box className={this.props.classes.innerPadding}>
                    <CompactCard>
                      <CardContent>
                        <Box mb={2}>
                          <Typography variant="h6">About Employer</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <Box className={this.props.classes.sideIcon} position="relative">
                            <Box
                              className={`flag ${this.state.address.country.iso2} margin`}
                              position="absolute"
                              top={5}
                              left={1}
                              style={{
                                transform: 'scale(1.4)',
                                transformOrigin: 'center left'
                              }}
                            />
                          </Box>
                          <Typography variant="body2">{this.state.address.country.name}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <DesktopMac className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.action.active} />
                          <Typography variant="body2">23 Projects Completed</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <WatchLater className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.action.active} />
                          <Typography variant="body2">Member since Jun 24, 2020</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mt={1}>
                          <Stars className={this.props.classes.sideIcon} htmlColor={this.props.theme.palette.action.active} />
                          <Box display="flex" flexWrap="wrap">
                            <Rating name="read-only" value={5} readOnly size="small" />
                            <Typography variant="body2">&nbsp;(0 reviews)</Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </CompactCard>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
  )
}

export default compose(
  withRouter,
  withStyles(styles),
  withTheme
)(ApplyJob);