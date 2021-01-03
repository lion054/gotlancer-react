import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  OutlinedInput,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';

export default class ChangeTitle extends PureComponent {
  handleCancel = () => {
    this.props.onClose();
  }

  handleSave = () => {}

  render = () => (
    <Dialog fullWidth open={this.props.open} onClose={this.handleCancel}>
      <DialogTitle>Change title</DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant="subtitle2">Your title</Typography>
        <Box mt={2} mb={2}>
          <Typography variant="body2">Enter a single sentence description of your perfessional skills/experience (e.g. Expert Web Designer with Ajax experience)</Typography>
        </Box>
        <OutlinedInput
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={this.handleCancel}>Cancel</Button>
        <Button variant="contained" onClick={this.handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

ChangeTitle.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}