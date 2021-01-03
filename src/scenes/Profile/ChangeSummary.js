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
import pluralize from 'pluralize';
import PropTypes from 'prop-types';

const maxCharacters = 5000;

export default class ChangeSummary extends PureComponent {
  state = {
    text: ''
  }

  handleChange = (e) => {
    if (e.target.value.length > maxCharacters) {
      e.stopPropagation();
      return false;
    }
    this.setState({ text: e.target.value });
  }

  handleCancel = () => {
    this.props.onClose();
  }

  handleSave = () => {}

  render = () => (
    <Dialog fullWidth open={this.props.open} onClose={this.handleCancel}>
      <DialogTitle>Change summary</DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant="body2">Use this space to show buyeres you have the skills and experience they`re looking for.</Typography>
        <Box style={{ fontSize: '0.875rem' }}>
          <ul>
            <li>Describe your strengths and skills</li>
            <li>Highlight projects, accomplishments and education</li>
            <li>Keep it short and make sure it`s error free</li>
          </ul>
        </Box>
        <Box>
          <Button color="primary">Learn more</Button>
        </Box>
        <OutlinedInput
          fullWidth
          margin="dense"
          multiline
          rows={8}
          value={this.state.text}
          onChange={this.handleChange}
        />
        <Typography variant="body2" color="textSecondary" align="right">{pluralize('character', maxCharacters - this.state.text.length, true)} left</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={this.handleCancel}>Cancel</Button>
        <Button variant="contained" onClick={this.handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

ChangeSummary.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}