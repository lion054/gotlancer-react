import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  field: {
    margin: theme.spacing(3, 0)
  },
  find: {
    marginLeft: theme.spacing(1)
  }
})

class AddBank extends PureComponent {
  render = () => (
    <Dialog
      open={this.props.open}
      onClose={this.props.onClose}
      scroll="paper"
    >
      <DialogTitle>Add Bank Information</DialogTitle>
      <DialogContent>
        <Box className={this.props.classes.field}>
          <Typography variant="subtitle1">IFSC Code</Typography>
          <Box mt={1} display="flex" flexDirection="row">
            <OutlinedInput
              fullWidth
              type="text"
              placeholder="Enter IFSC Code"
            />
            <Button variant="contained" className={this.props.classes.find}>Find</Button>
          </Box>
        </Box>
        <Box className={this.props.classes.field}>
          <Typography variant="subtitle1">Bank</Typography>
          <Typography variant="body2">ICICI BANK LTD, BIDHAN NAGAR (SALT LAKE - SEC) ICICI BANK LTD. INFINITY BENCHMARK PLOT NO.G1 BLOCK EP &amp; GP SECTOR 5 KOLKATA -700091 WEST BENGAL</Typography>
        </Box>
        <Box className={this.props.classes.field}>
          <Typography variant="subtitle1">Not your bank or branch?</Typography>
        </Box>
        <Box className={this.props.classes.field}>
          <Typography variant="subtitle1">Account Currency</Typography>
          <Typography variant="body2">Indian Rupee (INR)</Typography>
        </Box>
        <Box className={this.props.classes.field}>
          <Typography variant="subtitle1">Withdrawal Fee</Typography>
          <Typography variant="body2">No withdrawal fee</Typography>
        </Box>
        <Box className={this.props.classes.field}>
          <Typography variant="subtitle1">Account Holder Bank Information</Typography>
        </Box>
        <Box className={this.props.classes.field}>
          <Typography variant="subtitle1">Account Number</Typography>
          <Typography variant="body2">Your account number may include only capital letters and digits</Typography>
          <Box mt={2}>
            <OutlinedInput
              fullWidth
              type="text"
              placeholder="Enter Account Number"
            />
          </Box>
        </Box>
        <Box className={this.props.classes.field}>
          <Typography variant="subtitle1">PAN Number</Typography>
          <Typography variant="body2">PAN number (Permanent Account Number), 10 characters in length</Typography>
          <Box mt={2}>
            <OutlinedInput
              fullWidth
              type="text"
              placeholder="Enter PAN Number"
            />
          </Box>
        </Box>
        <Box className={this.props.classes.field}>
          <Typography variant="subtitle1">Account Type</Typography>
          <Typography variant="body2">Type of account</Typography>
          <Box mt={2}>
            <TextField
              variant="outlined"
              select
              fullWidth
              onChange={() => {}}
            >
              <MenuItem value="A">Type A</MenuItem>
              <MenuItem value="B">Type B</MenuItem>
            </TextField>
          </Box>
        </Box>
        <Box className={this.props.classes.field}>
          <Typography variant="subtitle1">First Name</Typography>
          <Typography variant="body2">First Name, 2 to 26 characters in length</Typography>
          <Box mt={2}>
            <OutlinedInput
              fullWidth
              type="text"
              placeholder="Enter First Name"
            />
          </Box>
        </Box>
        <Box className={this.props.classes.field}>
          <Typography variant="subtitle1">Last Name</Typography>
          <Typography variant="body2">Last Name, 2 to 26 characters in length</Typography>
          <Box mt={2}>
            <OutlinedInput
              fullWidth
              type="text"
              placeholder="Enter Last Name"
            />
          </Box>
        </Box>
        <Box className={this.props.classes.field}>
          <Typography variant="subtitle1">Name on Account</Typography>
          <Box mt={2}>
            <OutlinedInput
              fullWidth
              type="text"
              placeholder="Enter Name on Account"
            />
          </Box>
        </Box>
        <Box className={this.props.classes.field}>
          <Typography variant="subtitle1">Address</Typography>
          <Typography variant="body2">Please enter the physical address associated with this account. If the postal address where you receive mail is different than the physical address where you reside, our bank requires you enter the physical address.</Typography>
          <Box mt={2}>
            <OutlinedInput
              fullWidth
              type="text"
              placeholder="Enter Address"
            />
          </Box>
        </Box>
        <Box className={this.props.classes.field}>
          <Typography variant="subtitle1">Country</Typography>
          <Box mt={2}>
          </Box>
        </Box>
        <Box className={this.props.classes.field}>
          <Typography variant="subtitle1">Phone Number</Typography>
          <Box mt={2}>
            <MuiPhoneNumber
              fullWidth
              variant="outlined"
              defaultCountry="us"
              onChange={(phoneNumber) => this.setState({ phoneNumber })}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

AddBank.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default withStyles(styles)(AddBank);