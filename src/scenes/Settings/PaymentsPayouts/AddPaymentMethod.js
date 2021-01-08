import React, { PureComponent } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { compose } from 'redux';

const styles = (theme) => ({
  label: {
    marginBottom: theme.spacing(1)
  },
  creditCard: {
    marginLeft: theme.spacing(0.5),
    width: theme.spacing(5)
  }
});

class AddPaymentMethod extends PureComponent {
  state = {
    paymentMethod: 'credit-card'
  }

  handleCancel = () => {
    this.props.onClose();
  }

  handleSave = () => {}

  handleAccordion = (panel) => (event, isExpanded) => {
    if (isExpanded) {
      this.setState({ paymentMethod: panel });
    }
  }

  render = () => (
    <Dialog fullWidth open={this.props.open} onClose={this.handleCancel}>
      <DialogTitle>Add payment method</DialogTitle>
      <DialogContent style={{ paddingBottom: this.props.theme.spacing(3) }}>
        <RadioGroup value={this.state.paymentMethod} onChange={(e) => this.setState({ paymentMethod: e.target.value })}>
          <Accordion expanded={this.state.paymentMethod === 'credit-card'} onChange={this.handleAccordion('credit-card')}>
            <AccordionSummary>
              <FormControlLabel
                value="credit-card"
                control={(
                  <Radio checked={this.state.paymentMethod === 'credit-card'} onClick={(e) => e.stopPropagation()} />
                )}
                label={<Typography variant="subtitle1">Credit Card</Typography>}
                onClick={() => this.setState({ paymentMethod: 'credit-card' })}
              />
            </AccordionSummary>
            <AccordionDetails style={{ flexDirection: 'column' }}>
              <Box display="flex" justifyContent="space-between" alignItems="baseline" className={this.props.classes.label}>
                <Typography component="span" variant="subtitle2">Card Number</Typography>
                <Box display="flex">
                  <img alt="" src={require('../../../assets/images/payment-method/credit-cards/visa.png')} className={this.props.classes.creditCard} />
                  <img alt="" src={require('../../../assets/images/payment-method/credit-cards/master.png')} className={this.props.classes.creditCard} />
                  <img alt="" src={require('../../../assets/images/payment-method/credit-cards/amex.png')} className={this.props.classes.creditCard} />
                  <img alt="" src={require('../../../assets/images/payment-method/credit-cards/discover.png')} className={this.props.classes.creditCard} />
                </Box>
              </Box>
              <OutlinedInput
                fullWidth
                margin="dense"
                startAdornment={(
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faCreditCard} style={{ fontSize: '0.8em' }} />
                  </InputAdornment>
                )}
              />
              <Box display="flex" mt={2}>
                <Box flex={1} mr={1}>
                  <Typography variant="subtitle2" className={this.props.classes.label}>First Name</Typography>
                  <OutlinedInput fullWidth margin="dense" />
                </Box>
                <Box flex={1} ml={1}>
                  <Typography variant="subtitle2" className={this.props.classes.label}>Last Name</Typography>
                  <OutlinedInput fullWidth margin="dense" />
                </Box>
              </Box>
              <Box display="flex" mt={2}>
                <Box flex={1} mr={1}>
                  <Typography variant="subtitle2" className={this.props.classes.label}>Expires On</Typography>
                  <Box display="flex">
                    <Box mr={1}>
                      <OutlinedInput
                        fullWidth
                        margin="dense"
                        inputProps={{
                          placeholder: 'MM',
                          maxLength: 2
                        }}
                      />
                    </Box>
                    <Box ml={1}>
                      <OutlinedInput
                        fullWidth
                        margin="dense"
                        inputProps={{
                          placeholder: 'YYYY',
                          maxLength: 4
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box flex={1} ml={1}>
                  <Typography variant="subtitle2" className={this.props.classes.label}>Security Code</Typography>
                  <OutlinedInput fullWidth margin="dense" />
                </Box>
              </Box>
              <Box textAlign="right" my={2}>
                <Button variant="contained">Continue</Button>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={this.state.paymentMethod === 'paypal'} onChange={this.handleAccordion('paypal')}>
            <AccordionSummary>
              <FormControlLabel
                value="paypal"
                control={(
                  <Radio checked={this.state.paymentMethod === 'paypal'} onClick={(e) => e.stopPropagation()} />
                )}
                label={<img alt="" src={require('../../../assets/images/payment-method/paypal.png')} style={{ width: 100 }} />}
                onClick={() => this.setState({ paymentMethod: 'paypal' })}
              />
            </AccordionSummary>
            <AccordionDetails style={{ flexDirection: 'column' }}>
              <Box>
                <Button variant="contained">Pay with PayPal</Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </RadioGroup>
      </DialogContent>
    </Dialog>
  )
}

AddPaymentMethod.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default compose(
  withStyles(styles),
  withTheme
)(AddPaymentMethod);