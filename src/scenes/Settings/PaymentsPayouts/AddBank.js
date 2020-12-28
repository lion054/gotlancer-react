import React, { PureComponent } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  FormControlLabel,
  Grid,
  Link,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
  withStyles
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import MuiPhoneNumber from 'material-ui-phone-number';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import SelectCountry from '../../../components/SelectCountry';
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
  field: {
    margin: theme.spacing(3, 0)
  },
  find: {
    marginLeft: theme.spacing(1)
  }
})

class AddBank extends PureComponent {
  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12} style={{ maxWidth: 600 }}>
            <Box mb={2}>
              <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRight />}>
                <Link color="inherit" href="/settings">Settings</Link>
                <Link color="inherit" href="/settings/payments_payouts">Payments &amp; Payouts</Link>
                <Typography color="textSecondary">Add Bank</Typography>
              </Breadcrumbs>
            </Box>
            <Box mb={2}>
              <Typography variant="h5">Add Bank</Typography>
            </Box>
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
                <SelectCountry
                  fullWidth
                  autoHighlight
                  onChange={(e, item) => console.log(item)}
                />
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
            <Box className={this.props.classes.field}>
              <FormControlLabel
                control={(
                  <GreenCheckbox />
                )}
                label={<Typography variant="body2">I attest that I am the owner and have full authorization to this bank account.</Typography>}
              />
            </Box>
            <Box className={this.props.classes.field}>
              <Box mr={2} component="span">
                <Button variant="outlined">Back</Button>
              </Box>
              <Button variant="contained">Add my account</Button>
            </Box>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
  )
}

export default withStyles(styles)(AddBank);