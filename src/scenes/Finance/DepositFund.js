import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
  OutlinedInput,
  RadioGroup,
  Typography,
  colors,
  withStyles,
  withTheme
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { GreenRadio } from '../../global';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  card: {
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid'
  },
  cardIcon: {
    width: theme.spacing(8),
    height: theme.spacing(7)
  },
  background: {
    backgroundColor: theme.palette.background.default
  },
  creditCard: {
    height: theme.spacing(3),
    [theme.breakpoints.only('xs')]: {
      height: theme.spacing(2.5)
    }
  },
  info: {
    borderRadius: theme.spacing(1),
    backgroundColor: colors.blue[50],
    padding: theme.spacing(1, 1, 0)
  }
})

class DepositFund extends PureComponent {
  state = {
    paymentMethod: 'stripe-checkout'
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box mb={2}>
              <Typography variant="h5">Deposit fund</Typography>
            </Box>
            <Box m={-2}>
              <Grid container>
                <Grid item md={7} sm={8} xs={12}>
                  <Box p={2}>
                    <Card elevation={0} className={this.props.classes.card}>
                      <CardHeader
                        className={this.props.classes.background}
                        title="Add fund to your account"
                        titleTypographyProps={{
                          variant: 'subtitle1'
                        }}
                      />
                      <Divider />
                      <CardContent>
                        <Typography variant="subtitle2">How much balance do you need?</Typography>
                        <Typography variant="body2">Type an amount more then $10.  Cent (.) not allowed.</Typography>
                        <Box mt={2}>
                          <OutlinedInput
                            margin="dense"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                    <Box mt={2}>
                      <Card elevation={0} className={this.props.classes.card}>
                        <CardHeader
                          className={this.props.classes.background}
                          title="Add fund to your account"
                          titleTypographyProps={{
                            variant: 'subtitle1'
                          }}
                        />
                        <Divider />
                        <CardContent>
                          <Typography variant="subtitle2">Payment method</Typography>
                          <RadioGroup value={this.state.paymentMethod} onChange={(e) => this.setState({ paymentMethod: e.target.value })}>
                            <Box display="flex" alignItems="center">
                              <Box flex={1}>
                                <FormControlLabel
                                  value="stripe-checkout"
                                  control={(
                                    <GreenRadio checked={this.state.paymentMethod === 'stripe-checkout'} onClick={(e) => e.stopPropagation()} />
                                  )}
                                  label={<Typography variant="body1" component="span">Strip Checkout</Typography>}
                                  onClick={() => this.setState({ paymentMethod: 'stripe-checkout' })}
                                />
                              </Box>
                              <img alt="" className={this.props.classes.creditCard} src={require('../../assets/images/deposit-fund/stripe-checkout.png')} />
                            </Box>
                            <Box display="flex" alignItems="center">
                              <Box flex={1}>
                                <FormControlLabel
                                  value="paypal"
                                  control={(
                                    <GreenRadio checked={this.state.paymentMethod === 'paypal'} onClick={(e) => e.stopPropagation()} />
                                  )}
                                  label={<Typography variant="body1" component="span">PayPal</Typography>}
                                  onClick={() => this.setState({ paymentMethod: 'paypal' })}
                                />
                              </Box>
                              <img alt="" className={this.props.classes.creditCard} src={require('../../assets/images/deposit-fund/paypal.png')} />
                            </Box>
                            <Box display="flex" alignItems="center">
                              <Box flex={1}>
                                <FormControlLabel
                                  value="payu"
                                  control={(
                                    <GreenRadio checked={this.state.paymentMethod === 'payu'} onClick={(e) => e.stopPropagation()} />
                                  )}
                                  label={<Typography variant="body1" component="span">PayU</Typography>}
                                  onClick={() => this.setState({ paymentMethod: 'payu' })}
                                />
                              </Box>
                              <img alt="" className={this.props.classes.creditCard} src={require('../../assets/images/deposit-fund/payu.png')} />
                            </Box>
                          </RadioGroup>
                        </CardContent>
                      </Card>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={1} />
                <Grid item sm={4} xs={12}>
                  <Box p={2}>
                    <Card elevation={0} className={this.props.classes.card}>
                      <CardHeader
                        title="Order Summary"
                        titleTypographyProps={{
                          variant: 'subtitle1'
                        }}
                      />
                      <Divider />
                      <CardContent className={this.props.classes.background}>
                        <Box display="flex" mb={1} alignItems="center">
                          <Box flex={1}>
                            <Typography variant="body2">Deposit amount</Typography>
                          </Box>
                          <Typography variant="body2">$26.00</Typography>
                        </Box>
                        <Box display="flex" mb={1} alignItems="center">
                          <Box flex={1}>
                            <Typography variant="body2">VAT/Tax (2.5%)</Typography>
                          </Box>
                          <Typography variant="body2">$0.30 USD</Typography>
                        </Box>
                        <Box display="flex" mb={1} alignItems="center">
                          <Box flex={1}>
                            <Typography variant="body2">Processing fee (0%)</Typography>
                          </Box>
                          <Typography variant="body2">$0.00 USD</Typography>
                        </Box>
                        <Box display="flex" mb={3} alignItems="center">
                          <Box flex={1}>
                            <Typography variant="subtitle2">Total</Typography>
                            <Typography variant="body2">(Incl. VAT)</Typography>
                          </Box>
                          <Typography variant="body2">$26.30 USD</Typography>
                        </Box>
                        <Box className={this.props.classes.info}>
                          <Typography variant="body2">Account after top up</Typography>
                          <Box display="flex" mt={1}>
                            <Box flex={1}>
                              <Typography variant="subtitle2">Balance will add</Typography>
                            </Box>
                            <Typography variant="subtitle1">+ $26.00</Typography>
                          </Box>
                        </Box>
                        <Box mt={1} mb={1} textAlign="center">
                          <Typography variant="body2">By continuing, you are agreeing to our <Link href="#">terms and conditions</Link>. Its an ontime payment.</Typography>
                        </Box>
                        <Button fullWidth variant="contained">Checkout  <ChevronRight /></Button>
                        <Box mt={1} textAlign="center">
                          <Typography variant="body2">This page will redirect to checkout page. You could pay with your selected payment method.</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box p={2}>
                    <Card elevation={0} className={this.props.classes.card}>
                      <CardHeader
                        title="Frequently asked questions"
                        titleTypographyProps={{
                          variant: 'subtitle1'
                        }}
                      />
                      <CardContent className={this.props.classes.background}>
                        <Box m={-2}>
                          <Grid container>
                            <Grid item md={6} xs={12}>
                              <Box p={2}>
                                <Box mb={1}>
                                  <Typography variant="subtitle2">What is Gotlancer proposal credit?</Typography>
                                </Box>
                                <Typography variant="body2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at </Typography>
                              </Box>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Box p={2}>
                                <Box mb={1}>
                                  <Typography variant="subtitle2">What is Gotlancer proposal credit?</Typography>
                                </Box>
                                <Typography variant="body2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at </Typography>
                              </Box>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Box p={2}>
                                <Box mb={1}>
                                  <Typography variant="subtitle2">What is Gotlancer proposal credit?</Typography>
                                </Box>
                                <Typography variant="body2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at </Typography>
                              </Box>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Box p={2}>
                                <Box mb={1}>
                                  <Typography variant="subtitle2">What is Gotlancer proposal credit?</Typography>
                                </Box>
                                <Typography variant="body2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at </Typography>
                              </Box>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Box p={2}>
                                <Box mb={1}>
                                  <Typography variant="subtitle2">What is Gotlancer proposal credit?</Typography>
                                </Box>
                                <Typography variant="body2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at </Typography>
                              </Box>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Box p={2}>
                                <Box mb={1}>
                                  <Typography variant="subtitle2">What is Gotlancer proposal credit?</Typography>
                                </Box>
                                <Typography variant="body2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at </Typography>
                              </Box>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Box p={2}>
                                <Box mb={1}>
                                  <Typography variant="subtitle2">What is Gotlancer proposal credit?</Typography>
                                </Box>
                                <Typography variant="body2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at </Typography>
                              </Box>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Box p={2}>
                                <Box mb={1}>
                                  <Typography variant="subtitle2">What is Gotlancer proposal credit?</Typography>
                                </Box>
                                <Typography variant="body2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
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
  withStyles(styles),
  withTheme
)(DepositFund);