import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
  withStyles
} from '@material-ui/core';
import { AttachMoney } from '@material-ui/icons';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  outerMargin: {
    margin: theme.spacing(2, -2),
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(1, -1)
    }
  },
  innerPadding: {
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  }
});

class ChangeHourlyRate extends PureComponent {
  handleCancel = () => {
    this.props.onClose();
  }

  handleSave = () => {}

  render = () => (
    <Dialog open={this.props.open} onClose={this.handleCancel}>
      <DialogTitle>Change hourly rate</DialogTitle>
      <DialogContent>
        <Typography variant="body2">Please note that your new <b>Expert on Logo Design</b> hourly rate will only apply to new contracts. The Gotlancer Service Fee is 20% when you begin a contract with a new buyer. Once you bill over $500 with your buyer, the fee will be 10%.</Typography>
        <Box mt={2} mb={2}>
          <Typography variant="body2">Your profile rate: <b>$15.00/hr</b></Typography>
        </Box>
        <Divider />
        <Box className={this.props.classes.outerMargin}>
          <Grid container alignItems="center">
            <Grid item sm={6} xs={12}>
              <Box className={this.props.classes.innerPadding}>
                <Typography variant="subtitle2">Hourly Rate</Typography>
                <Typography variant="body2">Total amount the buyer will see</Typography>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box className={this.props.classes.innerPadding} display="flex" alignItems="center">
                <OutlinedInput
                  margin="dense"
                  inputProps={{
                    style: {
                      textAlign: 'right'
                    }
                  }}
                  startAdornment={(
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  )}
                />
                <Box ml={1}>
                  <Typography variant="body1">/hr</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box className={this.props.classes.outerMargin}>
          <Grid container alignItems="center">
            <Grid item sm={6} xs={12}>
              <Box className={this.props.classes.innerPadding}>
                <Typography variant="subtitle2">20% Gotlancer Service Fee</Typography>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box className={this.props.classes.innerPadding} display="flex" alignItems="center">
                <OutlinedInput
                  margin="dense"
                  inputProps={{
                    style: {
                      textAlign: 'right'
                    }
                  }}
                  startAdornment={(
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  )}
                />
                <Box ml={1}>
                  <Typography variant="body1">/hr</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box className={this.props.classes.outerMargin}>
          <Grid container alignItems="center">
            <Grid item sm={6} xs={12}>
              <Box className={this.props.classes.innerPadding}>
                <Typography variant="subtitle2">You`ll receive</Typography>
                <Typography variant="body2">The estimated amount you`ll received after service fee</Typography>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box className={this.props.classes.innerPadding} display="flex" alignItems="center">
                <OutlinedInput
                  margin="dense"
                  inputProps={{
                    style: {
                      textAlign: 'right'
                    }
                  }}
                  startAdornment={(
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  )}
                />
                <Box ml={1}>
                  <Typography variant="body1">/hr</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={this.handleCancel}>Cancel</Button>
        <Button variant="contained" onClick={this.handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

ChangeHourlyRate.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default withStyles(styles)(ChangeHourlyRate);