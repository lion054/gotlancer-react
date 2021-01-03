import React, { PureComponent } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';

export default class AddCertification extends PureComponent {
  state = {
    certifications: [
      'Adobe Certified Expert',
      'Appcelerator Titanium Certified Application Developer',
      'Appcelerator Titanium Certified Mobile Developer',
      'Associate Android Developer',
      'AWS Certified Advanced Networking - Speciality',
      'AWS Certified Alexa Skill Builder - Speciality'
    ]
  }

  handleCancel = () => {
    this.props.onClose();
  }

  handleSave = () => {}

  render = () => (
    <Dialog fullWidth open={this.props.open} onClose={this.handleCancel}>
      <DialogTitle>Add education</DialogTitle>
      <Divider />
      <DialogContent>
        <Autocomplete
          fullWidth
          options={this.state.certifications}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              margin="dense"
              fullWidth
              variant="outlined"
              {...params}
              placeholder="Select your certification"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={this.handleCancel}>Cancel</Button>
        <Button variant="contained" onClick={this.handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

AddCertification.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}