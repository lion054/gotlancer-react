import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles
} from '@material-ui/core';
import { Close, CloudUpload, Description } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';
import Dropzone from 'react-dropzone';
import clsx from 'clsx';

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
  item: {
    paddingLeft: theme.spacing(1)
  }
});

class FileUpload extends PureComponent {
  state = {
    inputId: uuidv4(),
    selectedFiles: []
  }

  handleFiles(files) {
    const selectedFiles = cloneDeep(this.state.selectedFiles);
    for (let i = 0; i < files.length; i++) {
      if (this.validateFile(files[i])) {
        // add to an array so we can display the name of file
        selectedFiles.push(files[i]);
      } else {
        // add a new property called invalid
        // add to the same array so we can display the name of the file
        // set error message
      }
    }
    this.setState({ selectedFiles });
  }

  validateFile(file) {
    const mimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/x-icon',
      'application/pdf',
      'application/msword'
    ];
    if (mimeTypes.indexOf(file.type) === -1) {
      return false;
    }
    if (this.state.selectedFiles.findIndex(item => item.name === file.name && item.lastModified === file.lastModified) !== -1) {
      return false;
    }
    return true;
  }

  onDropAccepted = (acceptedFiles, evt) => {
    console.log(acceptedFiles);
    this.handleFiles(acceptedFiles);
  }

  onDropRejected = (rejectedFiles, evt) => {
    console.log(rejectedFiles);
  }

  render = () => (
    <Box>
      <Dropzone
        onDropAccepted={this.onDropAccepted}
        onDropRejected={this.onDropRejected}
        multiple
        noClick
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps({
              className: clsx(this.props.classes.root, isDragActive && this.props.classes.active)
            })}
          >
            <CloudUpload />
            <Box mb={1}>
              <Typography variant="body1">Drag &amp; Drop your files to import it</Typography>
            </Box>
            <input
              id={this.state.inputId}
              {...getInputProps(this.props.inputProps)}
            />
            <label htmlFor={this.state.inputId}>
              <Button variant="outlined" component="span">Select file to upload</Button>
            </label>
            <Box my={1}>
              <Typography variant="body2" color="textSecondary">Supported files types are: PNG, JPG, JPEG, GIF, PDF, ZIP, Doc</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">Maximum File Count: 5, Maximum File Size: 20MB</Typography>
          </div>
        )}
      </Dropzone>
      <List disablePadding>
        {this.state.selectedFiles.map((file, index) => (
          <ListItem key={index} disableGutters className={this.props.classes.item}>
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <ListItemText
              primary={file.name}
              primaryTypographyProps={{
                variant: 'body2'
              }}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => {
                const selectedFiles = cloneDeep(this.state.selectedFiles);
                selectedFiles.splice(index, 1);
                this.setState({ selectedFiles });
              }}>
                <Close />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default withStyles(styles)(FileUpload);