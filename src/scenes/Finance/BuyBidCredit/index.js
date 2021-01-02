import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  colors,
  withStyles,
  withTheme
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { cloneDeep } from 'lodash';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { GreenCheckbox } from '../../../global';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  card: {
    borderRadius: theme.spacing(1.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid'
  },
  background: {
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
  innerPaddingWithTag: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(2, 1, 2)
    }
  },
  cutoff: {
    border: `solid 1px ${theme.palette.warning.main}`,
    padding: theme.spacing(0.5),
    color: theme.palette.warning.main
  },
  description: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'right'
    }
  }
})

class BuyBidCredit extends PureComponent {
  state = {
    paymentMethod: 'stripe-checkout',
    products: [{
      quantity: 10,
      amount: 1,
      checked: true
    },{
      quantity: 20,
      amount: 2,
      popular: true
    },{
      quantity: 50,
      amount: 4,
      cutoff: 1
    },{
      quantity: 100,
      amount: 8,
      cutoff: 2,
      popular: true
    },{
      quantity: 300,
      amount: 25,
      checked: true,
      cutoff: 5
    },{
      quantity: 500,
      amount: 40,
      cutoff: 10
    }],
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

  handleClick = (index) => (e) => {
    const products = cloneDeep(this.state.products);
    products[index].checked = !products[index].checked;
    this.setState({ products });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={6} mb={6}>
      <Box className={this.props.classes.innerPadding}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box className={this.props.outerMargin}>
              <Grid container>
                <Grid item md={7} sm={8} xs={12}>
                  <Box className={this.props.classes.innerPadding}>
                    <Card elevation={0} className={this.props.classes.card}>
                      <CardHeader
                        title="Buy bid credit"
                        titleTypographyProps={{
                          variant: 'subtitle1'
                        }}
                      />
                      <Divider />
                      <CardContent className={this.props.classes.background}>
                        <Typography variant="body2">Select a bid credit bundle</Typography>
                        <Typography variant="body2">Buy bid credit to apply more project</Typography>
                        <List disablePadding>
                          {this.state.products.map((product, index) => (
                            <ListItem key={index} disableGutters button onClick={this.handleClick(index)}>
                              <Box width="100%" display="flex" alignItems="center">
                                <GreenCheckbox checked={!!product.checked} onClick={this.handleClick(index)} />
                                <Box
                                  flex={1}
                                  className={this.props.classes.innerPaddingWithTag}
                                  borderRadius={4}
                                  border={`solid 1px ${product.checked ? this.props.theme.palette.success.main : this.props.theme.palette.divider}`}
                                  bgcolor={this.props.theme.palette.background.paper}
                                  position="relative"
                                >
                                  <Grid container alignItems="center">
                                    <Grid item md={1} xs={2}>
                                      <Typography variant="subtitle1">{product.quantity}</Typography>
                                    </Grid>
                                    <Grid item md={5} xs={10}>
                                      <Typography variant="body2" className={this.props.classes.description}>Buy {product.quantity} bid credit for</Typography>
                                    </Grid>
                                    <Grid item md={4} xs={8}>
                                      {!!product.cutoff && (
                                        <Typography variant="body2" component="span" className={this.props.classes.cutoff}>Your save ${product.cutoff} USD</Typography>
                                      )}
                                    </Grid>
                                    <Grid item md={2} xs={4}>
                                      <Box color={this.props.theme.palette.success.main}>
                                        <Typography variant="body1" align="right">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.amount)} USD</Typography>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                  {product.popular && (
                                    <Box
                                      position="absolute"
                                      left={0}
                                      top={0}
                                      borderRadius={4}
                                      p="0 4px"
                                      bgcolor={this.props.theme.palette.primary.dark}
                                      color={this.props.theme.palette.common.white}
                                    >
                                      <Typography style={{ fontSize: 12 }}>Popular</Typography>
                                    </Box>
                                  )}
                                </Box>
                              </Box>
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
                <Grid item md={1} />
                <Grid item sm={4} xs={12}>
                  <Box className={this.props.classes.innerPadding}>
                    <Card elevation={0} className={this.props.classes.card}>
                      <CardHeader
                        title="Billing"
                        titleTypographyProps={{
                          variant: 'subtitle1'
                        }}
                      />
                      <Divider />
                      <CardContent className={this.props.classes.background}>
                        <Box display="flex" mb={1} alignItems="center">
                          <Box flex={1}>
                            <Typography variant="body2">10 bid credit for</Typography>
                          </Box>
                          <Box color={this.props.theme.palette.success.main}>
                            <Typography variant="body2">$1.00 USD</Typography>
                          </Box>
                        </Box>
                        <Box display="flex" mb={1} alignItems="center">
                          <Box flex={1}>
                            <Typography variant="body2">300 bid credit for</Typography>
                          </Box>
                          <Box color={this.props.theme.palette.success.main}>
                            <Typography variant="body2">$25.00 USD</Typography>
                          </Box>
                        </Box>
                        <Box display="flex" mb={1} alignItems="center">
                          <Box flex={1}>
                            <Typography variant="body2">Tax</Typography>
                          </Box>
                          <Typography variant="body2">$0.00 USD</Typography>
                        </Box>
                        <Box display="flex" mb={1} alignItems="center">
                          <Box flex={1}>
                            <Typography variant="body2">Processing fee</Typography>
                          </Box>
                          <Typography variant="body2">$0.00 USD</Typography>
                        </Box>
                        <Box display="flex" mb={1} alignItems="center">
                          <Box flex={1}>
                            <Typography variant="body1">Due today</Typography>
                          </Box>
                          <Typography variant="body1">$26.00 USD</Typography>
                        </Box>
                        <Box
                          borderRadius={this.props.theme.spacing(1)}
                          bgcolor={colors.blue[50]}
                          pt={1}
                          pr={1}
                          pl={1}
                        >
                          <Typography variant="body2">Bid Credit will add after payment</Typography>
                          <Box display="flex" mt={1}>
                            <Box flex={1}>
                              <Typography variant="subtitle2">Credit will add</Typography>
                            </Box>
                            <Typography variant="subtitle1">310</Typography>
                          </Box>
                        </Box>
                        <Box mt={1} mb={1} textAlign="center">
                          <Typography variant="body2">By continuing, you are agreeing to our <Link href="#">terms and conditions</Link>. Its an ontime payment.</Typography>
                        </Box>
                        <Button fullWidth variant="contained" onClick={() => this.props.history.push('/buy_bid_credit/checkout')}>Checkout  <ChevronRight /></Button>
                        <Box mt={1} textAlign="center">
                          <Typography variant="body2">This page will redirect to checkout page. You could pay with your selected payment method.</Typography>
                        </Box>
                      </CardContent>
                    </Card>
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
    <Card elevation={0} className={this.props.classes.card}>
      <CardHeader
        title="Frequently asked questions"
        titleTypographyProps={{
          variant: 'subtitle1'
        }}
      />
      <CardContent className={this.props.classes.background}>
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
    </Card>
  )
}

export default compose(
  withRouter,
  withStyles(styles),
  withTheme
)(BuyBidCredit);