import React, { PureComponent } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  OutlinedInput,
  Typography,
  withStyles
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import MuiPhoneNumber from 'material-ui-phone-number';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import SelectCountry from '../../../components/SelectCountry';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  field: {
    margin: theme.spacing(3, 0)
  },
  find: {
    marginLeft: theme.spacing(1)
  }
})

class AddGst extends PureComponent {
  state = {
    phoneNumber: ''
  }

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <Box mt={8} ml={2} mr={2} mb={8}>
        <Grid container>
          <Grid item lg={2} />
          <Grid item lg={8} xs={12} style={{ maxWidth: 600 }}>
            <Box mb={2}>
              <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRight />}>
                <Link href="/settings">Settings</Link>
                <Link href="/settings/payments_payouts">Payments &amp; Payouts</Link>
                <Typography color="textSecondary">Add GST ID Number</Typography>
              </Breadcrumbs>
            </Box>
            <Box mb={2}>
              <Typography variant="h5">Add GST ID Number</Typography>
            </Box>
            <Box className={this.props.classes.field}>
              <Typography variant="subtitle1">First Name</Typography>
              <Typography variant="body2">First Name, 2 to 26 characters in length</Typography>
              <Box mt={2}>
                <OutlinedInput
                  fullWidth
                  margin="dense"
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
                  margin="dense"
                  placeholder="Enter Last Name"
                />
              </Box>
            </Box>
            <Box className={this.props.classes.field}>
              <Typography variant="subtitle1">GST registered email ID</Typography>
              <Typography variant="body2">We need your GST registred email id for send you money,</Typography>
              <Box mt={2}>
                <OutlinedInput
                  fullWidth
                  margin="dense"
                  placeholder="Enter GST registered email ID"
                />
              </Box>
            </Box>
            <Box className={this.props.classes.field}>
              <Typography variant="subtitle1">Address</Typography>
              <Typography variant="body2">Please enter the physical address associated with this account. If the postal address where you receive mail is different than the physical address where you reside, our bank requires you enter the physical address.</Typography>
              <Box mt={2}>
                <OutlinedInput
                  fullWidth
                  margin="dense"
                  placeholder="Enter Address"
                />
              </Box>
            </Box>
            <Box className={this.props.classes.field}>
              <Typography variant="subtitle1">City and State/Province</Typography>
              <Box mt={2}>
                <OutlinedInput
                  fullWidth
                  margin="dense"
                  placeholder="Enter City and State/Province"
                />
              </Box>
            </Box>
            <Box className={this.props.classes.field}>
              <Typography variant="subtitle1">Country</Typography>
              <Box mt={2}>
                <SelectCountry
                  fullWidth
                  margin="dense"
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
                  margin="dense"
                  variant="outlined"
                  defaultCountry="us"
                  onChange={(phoneNumber) => this.setState({ phoneNumber })}
                />
              </Box>
            </Box>
            <Box className={this.props.classes.field}>
              <FormControlLabel
                control={(
                  <Checkbox onClick={(e) => e.stopPropagation()} />
                )}
                label={<Typography variant="body2">I attest that I am the owner and have full authorization to this GST account.</Typography>}
                onClick={() => {}}
              />
            </Box>
            <Box className={this.props.classes.field}>
              <Box mr={2} component="span">
                <Button variant="outlined" size="large">Back</Button>
              </Box>
              <Button variant="contained" size="large">Add my account</Button>
            </Box>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </Box>
      <Footer />
    </div>
  )
}

export default withStyles(styles)(AddGst);