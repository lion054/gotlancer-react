import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
  colors,
  withStyles,
  withTheme
} from '@material-ui/core';
import { ChevronRight, VerifiedUser } from '@material-ui/icons';
import { compose } from 'redux';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { CompactCard } from '../../../global';

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
  creditCard: {
    height: theme.spacing(3),
    [theme.breakpoints.only('xs')]: {
      height: theme.spacing(2.5)
    }
  }
})

class Checkout extends PureComponent {
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
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box mb={2}>
              <Typography variant="h5">Checkout</Typography>
            </Box>
            <Box className={this.props.classes.outerMargin}>
              <Grid container>
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
                        <List>
                          <ListItem divider disableGutters>
                            <Box flex={1}>
                              <Typography variant="body1">I need a logo design</Typography>
                              <Typography variant="body2" color="textSecondary">I need a logo design for my comp...</Typography>
                            </Box>
                            <Typography variant="body1">$3,000</Typography>
                          </ListItem>
                          <ListItem divider disableGutters>
                            <Box flex={1}>
                              <Typography variant="body1">Upgrade listing</Typography>
                              <Typography variant="body2" color="textSecondary">You have selected Private listing</Typography>
                            </Box>
                            <Typography variant="body2">$5.00</Typography>
                          </ListItem>
                          <ListItem divider disableGutters>
                            <Box flex={1}>
                              <Typography variant="body1">Subtotal</Typography>
                            </Box>
                            <Typography variant="body2">$3,005.00</Typography>
                          </ListItem>
                          <ListItem divider disableGutters>
                            <Box flex={1}>
                              <Typography variant="body1">Vat/Tax (2.5%)</Typography>
                            </Box>
                            <Typography variant="body2">$75.12</Typography>
                          </ListItem>
                          <ListItem divider disableGutters>
                            <Box flex={1}>
                              <Typography variant="body1">Total</Typography>
                              <Typography variant="body2" color="textSecondary">(Incl. VAT/TAX)</Typography>
                            </Box>
                            <Typography variant="body1">$3,080.12</Typography>
                          </ListItem>
                        </List>
                        <Box
                          border={`solid 1px ${colors.yellow[700]}`}
                          borderRadius={this.props.theme.spacing(1)}
                          bgcolor={colors.yellow[50]}
                          pr={1}
                          pl={1}
                        >
                          <Box display="flex" mt={1}>
                            <Box flex={1}>
                              <Typography variant="body2">We will charge you</Typography>
                            </Box>
                            <Box color={this.props.theme.palette.success.main}>
                              <Typography variant="subtitle1">₹225337.11</Typography>
                            </Box>
                          </Box>
                          <Divider style={{ backgroundColor: colors.yellow[700] }} />
                          <Box display="flex" mt={1}>
                            <Box flex={1}>
                              <Typography variant="body2">Current exchange rate</Typography>
                            </Box>
                            <Typography variant="body1">$1 USD = ₹73.16</Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </CompactCard>
                  </Box>
                </Grid>
                <Grid item md={1} />
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
                        <Typography variant="subtitle2">Payment method</Typography>
                        <RadioGroup value={this.state.paymentMethod} onChange={(e) => this.setState({ paymentMethod: e.target.value })}>
                          <Box display="flex" alignItems="center">
                            <Box flex={1}>
                              <FormControlLabel
                                value="stripe-checkout"
                                control={(
                                  <Radio checked={this.state.paymentMethod === 'stripe-checkout'} onClick={(e) => e.stopPropagation()} />
                                )}
                                label={<Typography variant="body1" component="span">Stripe Checkout</Typography>}
                                onClick={() => this.setState({ paymentMethod: 'stripe-checkout' })}
                              />
                            </Box>
                            <img alt="" className={this.props.classes.creditCard} src={require('../../../assets/images/deposit-fund/stripe-checkout.png')} />
                          </Box>
                          <Divider />
                          <Box display="flex" alignItems="center">
                            <Box flex={1}>
                              <FormControlLabel
                                value="paypal"
                                control={(
                                  <Radio checked={this.state.paymentMethod === 'paypal'} onClick={(e) => e.stopPropagation()} />
                                )}
                                label={<Typography variant="body1" component="span">PayPal</Typography>}
                                onClick={() => this.setState({ paymentMethod: 'paypal' })}
                              />
                            </Box>
                            <img alt="" className={this.props.classes.creditCard} src={require('../../../assets/images/deposit-fund/paypal.png')} />
                          </Box>
                          <Divider />
                          <Box display="flex" alignItems="center">
                            <Box flex={1}>
                              <FormControlLabel
                                value="payu"
                                control={(
                                  <Radio checked={this.state.paymentMethod === 'payu'} onClick={(e) => e.stopPropagation()} />
                                )}
                                label={<Typography variant="body1" component="span">PayU</Typography>}
                                onClick={() => this.setState({ paymentMethod: 'payu' })}
                              />
                            </Box>
                            <img alt="" className={this.props.classes.creditCard} src={require('../../../assets/images/deposit-fund/payu.png')} />
                          </Box>
                          <Divider />
                          <Box display="flex" alignItems="center">
                            <Box flex={1}>
                              <FormControlLabel
                                value="wallet"
                                control={(
                                  <Radio checked={this.state.paymentMethod === 'wallet'} onClick={(e) => e.stopPropagation()} />
                                )}
                                label={(
                                  <Box pt={1} pb={1}>
                                    <Typography variant="body1" component="span">Pay from wallet</Typography>
                                    <Typography variant="body2">
                                      <span style={{ color: this.props.theme.palette.secondary.main }}>Sorry not insufficiant fund in wallet.</span>
                                      <span style={{ color: this.props.theme.palette.primary.main }}>Add Fund</span> in wallet.
                                    </Typography>
                                  </Box>
                                )}
                                onClick={() => this.setState({ paymentMethod: 'payu' })}
                              />
                            </Box>
                            <Typography variant="body1" component="span">$1,080.00</Typography>
                          </Box>
                          <Divider />
                          <Box m={-1} mt={2}>
                            <Grid container>
                              <Grid item md={8} xs={12}>
                                <Box p={1} display="flex">
                                  <VerifiedUser color="primary" style={{ fontSize: 64 }} />
                                  <Box ml={1}>
                                    <Box mb={1}>
                                      <Typography variant="body1">Buyer Protection</Typography>
                                    </Box>
                                    <Box mb={1}>
                                      <Typography variant="body1">Full Refund If you don't receive your order</Typography>
                                    </Box>
                                    <Typography variant="body1">Full or Partial Refund, If the product is not as described in details</Typography>
                                    <Button color="primary">Learn more <ChevronRight /></Button>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item md={4} xs={12}>
                                <Box p={1}>
                                  <Typography variant="subtitle1">All Total: $3,080.12</Typography>
                                  <Button variant="contained" fullWidth>Comfirm &amp; Pay</Button>
                                  <Box mt={1}>
                                    <Typography variant="body2">By clicking Confirm &amp; Pay button you agree to the <Link href="">Terms &amp; Conditions</Link></Typography>
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </RadioGroup>
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
  withStyles(styles),
  withTheme
)(Checkout);