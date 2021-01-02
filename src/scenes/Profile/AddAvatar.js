import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  withStyles
} from '@material-ui/core';
import AvatarEdit from 'react-avatar-edit';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {},
  preview: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: theme.palette.action.disabledBackground
  }
});

class AddAvatar extends PureComponent {
  state = {
    preview: null,
    src: ''
  }

  handleCrop = (preview) => this.setState({ preview })

  handleCancel = () => {
    this.setState({ preview: null });
    this.props.onClose();
  }

  handleSave = () => {}

  render = () => (
    <Dialog open={this.props.open} onClose={this.handleCancel}>
      <DialogTitle>Change Profile Photo</DialogTitle>
      <DialogContent>
        <Box display="flex">
          <AvatarEdit
            width={320}
            height={240}
            onCrop={(preview) => this.setState({ preview })}
            onClose={() => this.setState({ preview: null })}
            onBeforeFileLoad={(el) => {
              // if (el.target.files[0].size > 71680) {
              //   alert('File is too big!');
              //   el.target.value = '';
              // }
            }}
            src={this.state.src}
          />
          <Box ml={2} position="relative" display="flex" alignItems="center">
            {this.state.preview ? (
              <img alt="Preview" src={this.state.preview} className={this.props.classes.preview} />
            ) : (
              <div className={this.props.classes.preview} />
            )}
            <Box position="absolute" top={10} width="100%">
              <Typography variant="subtitle2" align="center">Preview</Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={this.handleCancel}>Cancel</Button>
        <Button variant="contained" onClick={this.handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

AddAvatar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default withStyles(styles)(AddAvatar);