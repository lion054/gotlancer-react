import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  OutlinedInput,
  Typography,
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';

import SelectCountry from '../../../components/SelectCountry';

const styles = (theme) => ({
  label: {
    margin: theme.spacing(2, 0, 1, 0),
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(1, 0, 0.5, 0)
    }
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
  }
});

class AddVat extends PureComponent {
  state = {
    country: ''
  }

  handleCancel = () => {
    this.setState({ country: '' });
    this.props.onClose();
  }

  handleSave = () => {}

  render = () => (
    <Dialog fullWidth open={this.props.open} onClose={this.handleCancel}>
      <DialogTitle>Add VAT ID Number</DialogTitle>
      <DialogContent>
        <Typography variant="body2">If you are registered with the European Commission, verification may take up to 48 hours. We’ll send you an email when its finished. More information on VAT IDs can be found here.</Typography>
        <Box mt={2} className={this.props.classes.outerMargin}>
          <Grid container>
            <Grid item sm={6} xs={12}>
              <Box className={this.props.classes.innerPadding}>
                <Typography variant="subtitle2" className={this.props.classes.label}>Country/region</Typography>
                <SelectCountry
                  fullWidth
                  margin="dense"
                  autoHighlight
                  onChange={(e, item) => this.setState({ country: item.iso2 })}
                />
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box className={this.props.classes.innerPadding}>
                <Typography variant="subtitle2" className={this.props.classes.label}>VAT ID Number</Typography>
                <OutlinedInput fullWidth margin="dense" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle2" className={this.props.classes.label}>Name on registration</Typography>
          <OutlinedInput fullWidth margin="dense" />
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle2" className={this.props.classes.label}>Address line 1</Typography>
          <OutlinedInput fullWidth margin="dense" />
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle2" className={this.props.classes.label}>Address line 2 (optional)</Typography>
          <OutlinedInput fullWidth margin="dense" />
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle2" className={this.props.classes.label}>City</Typography>
          <OutlinedInput fullWidth margin="dense" />
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle2" className={this.props.classes.label}>Zip/postal code</Typography>
          <OutlinedInput fullWidth margin="dense" />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" size="large" onClick={this.handleCancel}>Cancel</Button>
        <Button variant="contained" size="large" onClick={this.handleSave}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}

AddVat.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default withStyles(styles)(AddVat);