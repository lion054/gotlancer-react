import React, { PureComponent } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  CardContent,
  Divider,
  Grid,
  Link,
  Tabs,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { compose } from 'redux';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import AddPaymentMethod from './AddPaymentMethod';
import AddVat from './AddVat';
import { CompactCard, CompactTab } from '../../../global';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  cardIcon: {
    width: theme.spacing(8),
    height: theme.spacing(7)
  },
  creditCard: {
    marginLeft: theme.spacing(0.5),
    width: theme.spacing(5)
  },
  label: {
    marginBottom: theme.spacing(1)
  },
  input: {
    padding: theme.spacing(2),
    fontSize: theme.spacing(1.5)
  }
})

class PaymentsPayouts extends PureComponent {
  state = {
    activeTab: 0,
    currentEntry: '',
    loading: false,
    paymentMethodOpened: false,
    vatOpened: false
  }

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mx={2} my={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box mb={2}>
              <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRight />}>
                <Link href="/settings">Settings</Link>
                <Typography color="textSecondary">Payments &amp; Payouts</Typography>
              </Breadcrumbs>
            </Box>
            <Box mb={2}>
              <Typography variant="h5">Payments &amp; Payouts</Typography>
            </Box>
            <Box m={-2}>
              <Grid container>
                <Grid item md={6} sm={8} xs={12}>
                  <Box p={2}>
                    <CompactCard>
                      <CardContent style={{ paddingTop: 0 }}>
                        <Tabs
                          value={this.state.activeTab}
                          onChange={this.handleTabChange}
                          indicatorColor="primary"
                          textColor="primary"
                        >
                          <CompactTab label="Payments" />
                          <CompactTab label="Payouts" />
                          <CompactTab label="Taxes" />
                        </Tabs>
                        <Divider />
                        {this.renderPanel({
                          index: 0,
                          body: (
                            <Box mt={4}>
                              <Typography variant="h6">Payment methods</Typography>
                              <Box my={2}>
                                <Typography variant="body2">Add a payment method using our secure payment system, then start your project with Gotlancer</Typography>
                              </Box>
                              <Button variant="contained" size="large" onClick={() => this.setState({ paymentMethodOpened: true })}>Add Payment Method</Button>
                            </Box>
                          )
                        })}
                        {this.renderPanel({
                          index: 1,
                          body: (
                            <Box mt={4}>
                              <Typography variant="h6">Payout methods</Typography>
                              <Box mt={2}>
                                <Typography variant="body2">When you receive a payment for a reservation, we call that payment to you a "payout". Our secure payment system supports several payout methods, which can be set up below. Go to FAQ.</Typography>
                              </Box>
                              <Box mt={2}>
                                <Typography variant="subtitle1">To get paid, you need to set up a payout method</Typography>
                              </Box>
                              <Typography variant="body2">Airbnb releases payouts about 24 hours after a guest’s scheduled check-in time. The time it takes for the funds to appear in your account depends on your payout method. Learn more</Typography>
                              {this.renderEntry({
                                title: 'Add Bank',
                                description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
                                buttonTitle: 'Add Indian Bank',
                                buttonClicked: () => this.props.history.push('/settings/payments_payouts/add_bank')
                              })}
                              {this.renderEntry({
                                title: 'Add Payoneer',
                                description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
                                buttonTitle: 'Add Payoneer',
                                buttonClicked: () => this.props.history.push('/settings/payments_payouts/add_payoneer')
                              })}
                              {this.renderEntry({
                                title: 'Add PayPal',
                                description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
                                buttonTitle: 'Add PayPal',
                                buttonClicked: () => this.props.history.push('/settings/payments_payouts/add_paypal')
                              })}
                              {this.renderEntry({
                                title: 'Add Skrill',
                                description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
                                buttonTitle: 'Add Skrill',
                                buttonClicked: () => this.props.history.push('/settings/payments_payouts/add_skrill')
                              })}
                              {this.renderEntry({
                                title: 'Add Nagad',
                                description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
                                buttonTitle: 'Add Nagad',
                                buttonClicked: () => this.props.history.push('/settings/payments_payouts/add_nagad')
                              })}
                              {this.renderEntry({
                                title: 'Add bKash',
                                description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
                                buttonTitle: 'Add bKash',
                                buttonClicked: () => this.props.history.push('/settings/payments_payouts/add_bkash')
                              })}
                            </Box>
                          )
                        })}
                        {this.renderPanel({
                          index: 2,
                          body: (
                            <Box mt={2}>
                              {this.renderEntry({
                                title: 'Add VAT',
                                description: 'If you are registered for VAT or your stay is for business, you may not be charged VAT on Gotlancer service fees. To get started, enter your business’s VAT ID Number. Learn more about VAT.',
                                buttonTitle: 'Add VAT ID Number',
                                buttonClicked: () => this.setState({ vatOpened: true })
                              })}
                              {this.renderEntry({
                                title: 'Add PAN',
                                description: 'If you are registered for PAN or your stay is for business, you may not be charged PAN on Gotlancer service fees. To get started, enter your business’s PAN ID Number. Learn more about PAN.',
                                buttonTitle: 'Add PAN ID Number',
                                buttonClicked: () => this.props.history.push('/settings/payments_payouts/add_pan')
                              })}
                              {this.renderEntry({
                                title: 'Add GST',
                                description: 'If you are registered for GST or your stay is for business, you may not be charged GST on Gotlancer service fees. To get started, enter your business’s GST ID Number. Learn more about GST.',
                                buttonTitle: 'Add GST ID Number',
                                buttonClicked: () => this.props.history.push('/settings/payments_payouts/add_gst')
                              })}
                            </Box>
                          )
                        })}
                      </CardContent>
                    </CompactCard>
                  </Box>
                </Grid>
                <Grid item md={3} />
                <Grid item md={3} sm={4} xs={12}>
                  <Box p={2}>
                    <CompactCard>
                      <CardContent>
                        <img alt="" className={this.props.classes.cardIcon} src={require('../../../assets/images/settings/payments-and-payouts.svg')} />
                        <Typography variant="subtitle2">Let's make your account more secure</Typography>
                        <Typography variant="body2">Your account security: Medium</Typography>
                        <Typography variant="body2">We’re always working on ways to increase safety in our community. That’s why we look at every account to make sure it’s as secure as possible.</Typography>
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
      <AddPaymentMethod
        open={this.state.paymentMethodOpened}
        onClose={() => this.setState({ paymentMethodOpened: false })}
      />
      <AddVat
        open={this.state.vatOpened}
        onClose={() => this.setState({ vatOpened: false })}
      />
    </div>
  )

  renderPanel = ({ index, body }) => (
    <div role="tabpanel" hidden={this.state.activeTab !== index}>
      {body}
    </div>
  )

  renderEntry = ({ title, description, buttonTitle, buttonClicked }) => (
    <Box mt={3}>
      <Typography variant="h6">{title}</Typography>
      <Box my={2}>
        <Typography variant="body2">{description}</Typography>
      </Box>
      <Button variant="contained" size="large" onClick={buttonClicked}>{buttonTitle}</Button>
    </Box>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(PaymentsPayouts);