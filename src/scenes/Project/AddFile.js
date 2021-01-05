import React, { PureComponent } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider
} from '@material-ui/core';
import PropTypes from 'prop-types';

import FileUpload from '../../components/FileUpload';

export default class AddFile extends PureComponent {
  handleCancel = () => {
    this.props.onClose();
  }

  handleSave = () => {}

  render = () => (
    <Dialog fullWidth open={this.props.open} onClose={this.handleCancel}>
      <DialogTitle>Upload file</DialogTitle>
      <Divider />
      <DialogContent>
        <FileUpload />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={this.handleCancel}>Cancel</Button>
        <Button variant="contained" onClick={this.handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

AddFile.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}