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
import { compose } from 'redux';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { GreenCheckbox } from '../../global';

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
  cardHeader: {
    backgroundColor: theme.palette.background.default
  },
  info: {
    borderRadius: theme.spacing(1),
    backgroundColor: colors.blue[50],
    padding: theme.spacing(1, 1, 0)
  },
  warning: {
    borderColor: theme.palette.warning.main,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: theme.spacing(0.5),
    color: theme.palette.warning.main
  },
  success: {
    color: theme.palette.success.main
  },
  description: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'right'
    }
  }
})

class BuyProposalCredit extends PureComponent {
  state = {
    paymentMethod: 'stripe-checkout',
    products: [{
      quantity: 10,
      amount: 1,
      checked: true
    },{
      quantity: 20,
      amount: 2
    },{
      quantity: 50,
      amount: 4,
      cutoff: 1
    },{
      quantity: 100,
      amount: 8,
      cutoff: 2
    },{
      quantity: 300,
      amount: 25,
      checked: true,
      cutoff: 5
    },{
      quantity: 500,
      amount: 40,
      cutoff: 10
    }]
  }

  handleClick = (index) => (e) => {
    const products = cloneDeep(this.state.products);
    products[index].checked = !products[index].checked;
    this.setState({ products });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box m={-2}>
              <Grid container>
                <Grid item md={7} sm={8} xs={12}>
                  <Box p={2}>
                    <Card elevation={0} className={this.props.classes.card}>
                      <CardHeader
                        className={this.props.classes.cardHeader}
                        title="Buy proposal credit"
                        titleTypographyProps={{
                          variant: 'subtitle1'
                        }}
                      />
                      <Divider />
                      <CardContent>
                        <Typography variant="body2">Select a proposal credit bundle</Typography>
                        <Typography variant="body2">Buy proposal credit to apply more project</Typography>
                        <List>
                          {this.state.products.map((product, index) => (
                            <ListItem key={index} button onClick={this.handleClick(index)}>
                              <Box width="100%" display="flex">
                                <GreenCheckbox checked={!!product.checked} onClick={(e) => e.stopPropagation()} />
                                <Grid container alignItems="center">
                                  <Grid item md={1} xs={2}>
                                    <Typography variant="subtitle1">{product.quantity}</Typography>
                                  </Grid>
                                  <Grid item md={5} xs={10}>
                                    <Typography variant="body2" className={this.props.classes.description}>Buy {product.quantity} proposal credit for</Typography>
                                  </Grid>
                                  <Grid item md={4} xs={8}>
                                    {!!product.cutoff && (
                                      <Box>
                                        <Typography variant="body2" component="span" className={this.props.classes.warning}>Your save ${product.cutoff} USD</Typography>
                                      </Box>
                                    )}
                                  </Grid>
                                  <Grid item md={2} xs={4}>
                                    <Typography variant="body1" align="right" className={this.props.classes.success}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.amount)} USD</Typography>
                                  </Grid>
                                </Grid>
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
                  <Box p={2}>
                    <Card elevation={0} className={this.props.classes.card}>
                      <CardHeader
                        title="Billing"
                        titleTypographyProps={{
                          variant: 'subtitle1'
                        }}
                      />
                      <Divider />
                      <CardContent className={this.props.classes.cardHeader}>
                        <Box display="flex" mb={1} alignItems="center">
                          <Box flex={1}>
                            <Typography variant="body2">10 proposal credit for</Typography>
                          </Box>
                          <Typography variant="body2">$1.00 USD</Typography>
                        </Box>
                        <Box display="flex" mb={1} alignItems="center">
                          <Box flex={1}>
                            <Typography variant="body2">300 proposal credit for</Typography>
                          </Box>
                          <Typography variant="body2">$25.00 USD</Typography>
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
                        <Box className={this.props.classes.info}>
                          <Typography variant="body2">Proposal Credit will add after payment</Typography>
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
                      <CardContent className={this.props.classes.cardHeader}>
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
)(BuyProposalCredit);