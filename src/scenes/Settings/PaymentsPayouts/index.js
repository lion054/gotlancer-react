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
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
  OutlinedInput,
  Tab,
  Tabs,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { compose } from 'redux';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { GreenRadio } from '../../../global';

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
    paymentMethod: 'credit-card'
  }

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12}>
            <Box mb={2}>
              <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRight />}>
                <Link color="inherit" href="/settings">Settings</Link>
                <Typography color="textSecondary">Payments &amp; Payouts</Typography>
              </Breadcrumbs>
            </Box>
            <Box mb={2}>
              <Typography variant="h5">Payments &amp; Payouts</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item md={6} sm={7} xs={12}>
                <Tabs value={this.state.activeTab} onChange={this.handleTabChange}>
                  <Tab label="Payments" />
                  <Tab label="Payouts" />
                  <Tab label="Taxes" />
                </Tabs>
                {this.renderPanel({
                  index: 0,
                  body: (
                    <Box mt={4}>
                      <Typography variant="h6">Payment methods</Typography>
                      <Box mt={2} mb={2}>
                        <Typography variant="body2">Add a payment method using our secure payment system, then start your project with Gotlancer</Typography>
                      </Box>
                      <Button variant="contained" size="large" onClick={this.onOpenPaymentMethodDialog}>Add Payment Method</Button>
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
                      <Box mt={2}>
                        <Typography variant="h6">Add Bank</Typography>
                      </Box>
                      <Box mt={2} mb={2}>
                        <Typography variant="body2">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</Typography>
                      </Box>
                      <Button variant="contained" size="large" onClick={() => this.props.history.push('/settings/payments_payouts/add_bank')}>Add Indian Bank</Button>
                      <Box mt={3}>
                        <Typography variant="h6">Add Payoneer</Typography>
                      </Box>
                      <Box mt={2} mb={2}>
                        <Typography variant="body2">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</Typography>
                      </Box>
                      <Button variant="contained" size="large" onClick={() => this.props.history.push('/settings/payments_payouts/add_payoneer')}>Add Payoneer</Button>
                      <Box mt={3}>
                        <Typography variant="h6">Add PayPal</Typography>
                      </Box>
                      <Box mt={2} mb={2}>
                        <Typography variant="body2">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</Typography>
                      </Box>
                      <Button variant="contained" size="large" onClick={() => this.props.history.push('/settings/payments_payouts/add_paypal')}>Add PayPal</Button>
                      <Box mt={3}>
                        <Typography variant="h6">Add Skrill</Typography>
                      </Box>
                      <Box mt={2} mb={2}>
                        <Typography variant="body2">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</Typography>
                      </Box>
                      <Button variant="contained" size="large" onClick={() => this.props.history.push('/settings/payments_payouts/add_skrill')}>Add Skrill</Button>
                      <Box mt={3}>
                        <Typography variant="h6">Add Nagad</Typography>
                      </Box>
                      <Box mt={2} mb={2}>
                        <Typography variant="body2">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</Typography>
                      </Box>
                      <Button variant="contained" size="large" onClick={() => this.props.history.push('/settings/payments_payouts/add_nagad')}>Add Nagad</Button>
                      <Box mt={3}>
                        <Typography variant="h6">Add bKash</Typography>
                      </Box>
                      <Box mt={2} mb={2}>
                        <Typography variant="body2">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</Typography>
                      </Box>
                      <Button variant="contained" size="large" onClick={() => this.props.history.push('/settings/payments_payouts/add_bkash')}>Add bKash</Button>
                    </Box>
                  )
                })}
                {this.renderPanel({
                  index: 2,
                  body: (
                    <Box mt={4}>
                      <Typography variant="h6">Add VAT</Typography>
                      <Box mt={2} mb={2}>
                        <Typography variant="body2">If you are registered for VAT or your stay is for business, you may not be charged VAT on Gotlancer service fees. To get started, enter your business’s VAT ID Number. Learn more about VAT.</Typography>
                      </Box>
                      <Button variant="contained" size="large">Add VAT ID Number</Button>
                      <Box mt={3}>
                        <Typography variant="h6">Add PAN</Typography>
                      </Box>
                      <Box mt={2} mb={2}>
                        <Typography variant="body2">If you are registered for VAT or your stay is for business, you may not be charged VAT on Gotlancer service fees. To get started, enter your business’s VAT ID Number. Learn more about VAT.</Typography>
                      </Box>
                      <Button variant="contained" size="large">Add PAN ID Number</Button>
                      <Box mt={3}>
                        <Typography variant="h6">Add GST</Typography>
                      </Box>
                      <Box mt={2} mb={2}>
                        <Typography variant="body2">If you are registered for VAT or your stay is for business, you may not be charged VAT on Gotlancer service fees. To get started, enter your business’s VAT ID Number. Learn more about VAT.</Typography>
                      </Box>
                      <Button variant="contained" size="large">Add GST ID Number</Button>
                    </Box>
                  )
                })}
              </Grid>
              <Grid item md={3} sm={1} />
              <Grid item md={3} sm={4} xs={12}>
                <Card elevation={0} className={this.props.classes.card}>
                  <CardContent>
                    <img alt="" className={this.props.classes.cardIcon} src={require('../../../assets/images/settings/payments-and-payouts.svg')} />
                    <Typography variant="subtitle2">Let's make your account more secure</Typography>
                    <Typography variant="body2">Your account security: Medium</Typography>
                    <Typography variant="body2">We’re always working on ways to increase safety in our community. That’s why we look at every account to make sure it’s as secure as possible.</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
      {this.renderPaymentMethodDialog()}
    </div>
  )

  renderPanel = ({ index, body }) => (
    <div role="tabpanel" hidden={this.state.activeTab !== index}>
      {body}
    </div>
  )

  onOpenPaymentMethodDialog = () => this.setState({ paymentMethodOpened: true })

  onClosePaymentMethodDialog = () => this.setState({ paymentMethodOpened: false })

  onChangePaymentAccordion = (panel) => (event, isExpanded) => {
    if (isExpanded) {
      this.setState({ paymentMethod: panel });
    }
  }

  renderPaymentMethodDialog = () => (
    <Dialog
      open={this.state.paymentMethodOpened}
      onClose={this.onClosePaymentMethodDialog}
      scroll="paper"
    >
      <DialogTitle>Add payment method</DialogTitle>
      <DialogContent style={{ paddingBottom: this.props.theme.spacing(3) }}>
        <Accordion expanded={this.state.paymentMethod === 'credit-card'} onChange={this.onChangePaymentAccordion('credit-card')}>
          <AccordionSummary>
            <FormControlLabel
              value="credit-card"
              control={(
                <GreenRadio checked={this.state.paymentMethod === 'credit-card'} onClick={(e) => e.stopPropagation()} />
              )}
              label={<Typography variant="subtitle1">Credit Card</Typography>}
              onClick={() => this.setState({ paymentMethod: 'credit-card' })}
            />
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: 'column' }}>
            <Box display="flex" alignItems="baseline" className={this.props.classes.label}>
              <Typography component="span" variant="subtitle2" style={{ flex: 1 }}>Card Number</Typography>
              <img alt="" src={require('../../../assets/images/credit-cards/visa.png')} className={this.props.classes.creditCard} />
              <img alt="" src={require('../../../assets/images/credit-cards/master.png')} className={this.props.classes.creditCard} />
              <img alt="" src={require('../../../assets/images/credit-cards/amex.png')} className={this.props.classes.creditCard} />
              <img alt="" src={require('../../../assets/images/credit-cards/discover.png')} className={this.props.classes.creditCard} />
            </Box>
            <OutlinedInput
              fullWidth
              type="text"
              inputProps={{
                className: this.props.classes.input
              }}
              startAdornment={(
                <InputAdornment>
                  <FontAwesomeIcon icon={faCreditCard} style={{ fontSize: '0.8em' }} />
                </InputAdornment>
              )}
            />
            <Box display="flex" mt={2}>
              <Box flex={1} mr={1}>
                <Typography variant="subtitle2" className={this.props.classes.label}>First Name</Typography>
                <OutlinedInput
                  fullWidth
                  type="text"
                  inputProps={{
                    className: this.props.classes.input
                  }}
                />
              </Box>
              <Box flex={1} ml={1}>
                <Typography variant="subtitle2" className={this.props.classes.label}>Last Name</Typography>
                <OutlinedInput
                  fullWidth
                  type="text"
                  inputProps={{
                    className: this.props.classes.input
                  }}
                />
              </Box>
            </Box>
            <Box display="flex" mt={2}>
              <Box flex={1} mr={1}>
                <Typography variant="subtitle2" className={this.props.classes.label}>Expires On</Typography>
                <Box display="flex">
                  <Box mr={1}>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      inputProps={{
                        className: this.props.classes.input,
                        placeholder: 'MM',
                        maxLength: 2
                      }}
                    />
                  </Box>
                  <Box ml={1}>
                    <OutlinedInput
                      fullWidth
                      type="text"
                      inputProps={{
                        className: this.props.classes.input,
                        placeholder: 'YYYY',
                        maxLength: 4
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box flex={1} ml={1}>
                <Typography variant="subtitle2" className={this.props.classes.label}>Security Code</Typography>
                <OutlinedInput
                  fullWidth
                  type="text"
                  inputProps={{
                    className: this.props.classes.input
                  }}
                />
              </Box>
            </Box>
            <Box textAlign="right" mt={2} mb={2}>
              <Button variant="contained">Continue</Button>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={this.state.paymentMethod === 'paypal'} onChange={this.onChangePaymentAccordion('paypal')}>
          <AccordionSummary>
            <FormControlLabel
              value="paypal"
              control={(
                <GreenRadio checked={this.state.paymentMethod === 'paypal'} onClick={(e) => e.stopPropagation()} />
              )}
              label={<img alt="" src={require('../../../assets/images/paypal.png')} style={{ width: 100 }} />}
              onClick={() => this.setState({ paymentMethod: 'paypal' })}
            />
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: 'column' }}>
            <Box>
              <Button variant="contained">Pay with PayPal</Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </DialogContent>
    </Dialog>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(PaymentsPayouts);