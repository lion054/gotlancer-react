import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
  colors,
  withStyles,
  withTheme
} from '@material-ui/core';
import { AttachMoney } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CompactCard, formatCurrency } from '../../global';

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
  moneyPrefix: {
    marginLeft: theme.spacing(-0.5)
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
    paymentMethod: 'stripe-checkout',
    faqList: []
  }

  componentDidMount() {
    const faqList = [];
    for (let i = 0; i < 8; i++) {
      faqList.push({
        question: 'What is Gotlancer bid credit?',
        answer: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at'
      });
    }
    this.setState({ faqList });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box my={6}>
        <Box className={this.props.classes.innerPadding}>
          <Grid container>
            <Grid item lg={2} />
            <Grid item lg={8} xs={12}>
              <Box mb={2}>
                <Typography variant="h5">Deposit fund</Typography>
              </Box>
              <Box className={this.props.classes.outerMargin}>
                <Grid container>
                  <Grid item md={7} sm={8} xs={12}>
                    <Box className={this.props.classes.innerPadding}>
                      <CompactCard>
                        <CardHeader
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
                              startAdornment={(
                                <InputAdornment position="start" className={this.props.classes.moneyPrefix}>
                                  <AttachMoney />
                                </InputAdornment>
                              )}
                            />
                          </Box>
                        </CardContent>
                      </CompactCard>
                      <Box mt={2}>
                        <CompactCard>
                          <CardHeader
                            title="Add fund to your account"
                            titleTypographyProps={{
                              variant: 'subtitle1'
                            }}
                          />
                          <Divider />
                          <CardContent>
                            <Typography variant="subtitle2">Payment method</Typography>
                            <RadioGroup value={this.state.paymentMethod} onChange={(e) => this.setState({ paymentMethod: e.target.value })}>
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <FormControlLabel
                                  value="stripe-checkout"
                                  control={(
                                    <Radio checked={this.state.paymentMethod === 'stripe-checkout'} onClick={(e) => e.stopPropagation()} />
                                  )}
                                  label={<Typography variant="body1" component="span">Stripe Checkout</Typography>}
                                  onClick={() => this.setState({ paymentMethod: 'stripe-checkout' })}
                                />
                                <img alt="" className={this.props.classes.creditCard} src={require('../../assets/images/deposit-fund/stripe-checkout.png')} />
                              </Box>
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <FormControlLabel
                                  value="paypal"
                                  control={(
                                    <Radio checked={this.state.paymentMethod === 'paypal'} onClick={(e) => e.stopPropagation()} />
                                  )}
                                  label={<Typography variant="body1" component="span">PayPal</Typography>}
                                  onClick={() => this.setState({ paymentMethod: 'paypal' })}
                                />
                                <img alt="" className={this.props.classes.creditCard} src={require('../../assets/images/deposit-fund/paypal.png')} />
                              </Box>
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <FormControlLabel
                                  value="payu"
                                  control={(
                                    <Radio checked={this.state.paymentMethod === 'payu'} onClick={(e) => e.stopPropagation()} />
                                  )}
                                  label={<Typography variant="body1" component="span">PayU</Typography>}
                                  onClick={() => this.setState({ paymentMethod: 'payu' })}
                                />
                                <img alt="" className={this.props.classes.creditCard} src={require('../../assets/images/deposit-fund/payu.png')} />
                              </Box>
                            </RadioGroup>
                          </CardContent>
                        </CompactCard>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={1} />
                  <Grid item sm={4} xs={12}>
                    <Box className={this.props.classes.innerPadding}>
                      <CompactCard>
                        <CardHeader
                          title="Order Summary"
                          titleTypographyProps={{
                            variant: 'subtitle1'
                          }}
                        />
                        <Divider />
                        <CardContent>
                          <Box mb={1} display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2">Deposit amount</Typography>
                            <Typography variant="body2">{formatCurrency(26)}</Typography>
                          </Box>
                          <Box mb={1} display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2">VAT/Tax (2.5%)</Typography>
                            <Typography variant="body2">{formatCurrency(0.3)}</Typography>
                          </Box>
                          <Box mb={1} display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2">Processing fee (0%)</Typography>
                            <Typography variant="body2">{formatCurrency(0)}</Typography>
                          </Box>
                          <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
                            <Box>
                              <Typography variant="subtitle2">Total</Typography>
                              <Typography variant="body2">(Incl. VAT)</Typography>
                            </Box>
                            <Typography variant="body2">{formatCurrency(26.3)}</Typography>
                          </Box>
                          <Box className={this.props.classes.info}>
                            <Typography variant="body2">Account after top up</Typography>
                            <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
                              <Typography variant="subtitle2">Balance will add</Typography>
                              <Typography variant="subtitle1">+ {formatCurrency(26.3)}</Typography>
                            </Box>
                          </Box>
                          <Box my={1} textAlign="center">
                            <Typography variant="body2">By continuing, you are agreeing to our <Link href="#">terms and conditions</Link>. Its an ontime payment.</Typography>
                          </Box>
                          <Button fullWidth variant="contained">Play Now</Button>
                          <Box mt={1} textAlign="center">
                            <Typography variant="body2">This page will redirect to checkout page. You could pay with your selected payment method.</Typography>
                          </Box>
                        </CardContent>
                      </CompactCard>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box className={this.props.classes.innerPadding}>
                      {this.renderFaqList()}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item lg={2} />
          </Grid>
        </Box>
      </Box>
      <Footer />
    </div>
  )

  renderFaqList = () => (
    <CompactCard>
      <CardHeader
        title="Frequently asked questions"
        titleTypographyProps={{
          variant: 'subtitle1'
        }}
      />
      <CardContent>
        <Box className={this.props.classes.outerMargin}>
          <Grid container>
            {this.state.faqList.map((faq, index) => (
              <Grid key={index} item md={6} xs={12}>
                <Box className={this.props.classes.innerPadding}>
                  <Box mb={1}>
                    <Typography variant="subtitle2">{faq.question}</Typography>
                  </Box>
                  <Typography variant="body2">{faq.answer}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </CompactCard>
  )
}

export default compose(
  withRouter,
  withStyles(styles),
  withTheme
)(DepositFund);