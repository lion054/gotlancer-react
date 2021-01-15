import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { AiOutlineClose, AiOutlineCloudUpload } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import Dropzone from 'react-dropzone';
import clsx from 'clsx';
import { compose } from 'redux';

const styles = (theme) => ({
  '@keyframes progress': {
    '0%': {
      backgroundPosition: '0 0'
    },
    '100%': {
      backgroundPosition: '-70px 0'
    }
  },
  root: {
    borderRadius: theme.spacing(0.5),
    borderColor: theme.palette.divider,
    borderStyle: 'solid',
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  active: {
    animation: '$progress 2s linear infinite !important',
    // eslint-disable-next-line max-len
    backgroundImage: `repeating-linear-gradient(-45deg, ${theme.palette.background.paper}, ${theme.palette.background.paper} 25px, ${theme.palette.divider} 25px, ${theme.palette.divider} 50px)`,
    backgroundSize: '150% 100%',
    borderColor: theme.palette.primary.light,
    borderStyle: 'solid'
  },
  close: {
    border: `solid 1px ${theme.palette.action.disabled}`,
    padding: theme.spacing(0.5),
    position: 'absolute',
    top: 4,
    right: 4
  }
});

class UploadPreview extends PureComponent {
  state = {
    inputId: uuidv4(),
    file: {},
    preview: null
  }

  handleFile(file) {
    if (this.validateFile(file)) {
      // add to an array so we can display the name of file
      this.setState({ file, preview: URL.createObjectURL(file) });
    } else {
      // add a new property called invalid
      // add to the same array so we can display the name of the file
      // set error message
    }
  }

  validateFile(file) {
    const mimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif'
    ];
    if (mimeTypes.indexOf(file.type) === -1) {
      return false;
    }
    if (this.state.file.name === file.name && this.state.file.lastModified === file.lastModified) {
      return false;
    }
    return true;
  }

  onDropAccepted = (acceptedFiles, evt) => {
    console.log(acceptedFiles);
    this.handleFile(acceptedFiles[0]);
  }

  onDropRejected = (rejectedFiles, evt) => {
    console.log(rejectedFiles);
  }

  handleClose = () => this.setState({
    file: {},
    preview: null
  })

  render = () => this.state.preview ? (
    <Box
      textAlign="center"
      border={`solid 1px ${this.props.theme.palette.divider}`}
      position="relative"
      style={{ height: 190, boxSizing: 'border-box' }}
    >
      <img alt="" src={this.state.preview} style={{ width: 'auto', height: '100%' }} />
      <IconButton className={this.props.classes.close} onClick={this.handleClose}>
        <AiOutlineClose />
      </IconButton>
    </Box>
  ) : (
    <Dropzone
      onDropAccepted={this.onDropAccepted}
      onDropRejected={this.onDropRejected}
      noClick
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          {...getRootProps({
            className: clsx(this.props.classes.root, isDragActive && this.props.classes.active)
          })}
        >
          <AiOutlineCloudUpload size={24} />
          <Box mb={1}>
            <Typography variant="body1">Drag &amp; Drop your file to import it</Typography>
          </Box>
          <input
            id={this.state.inputId}
            {...getInputProps(this.props.inputProps)}
          />
          <label htmlFor={this.state.inputId}>
            <Button variant="outlined" component="span">Select file to upload</Button>
          </label>
          <Box my={1}>
            <Typography variant="body2" color="textSecondary">Supported files types are: PNG, JPG, JPEG, GIF</Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">Maximum File Size: 20MB</Typography>
        </div>
      )}
    </Dropzone>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(UploadPreview);