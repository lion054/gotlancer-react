import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  withStyles,
  withWidth
} from '@material-ui/core';
import AvatarEdit from 'react-avatar-edit';
import PropTypes from 'prop-types';
import { compose } from 'redux';

const styles = (theme) => ({
  outerMargin: {
    margin: theme.spacing(-1)
  },
  innerPadding: {
    padding: theme.spacing(1)
  },
  preview: {
    // [theme.breakpoints.only('xs')]: {
    //   width: 80,
    //   height: 80,
    //   borderRadius: 40
    // },
    // [theme.breakpoints.only('sm')]: {
    //   width: 100,
    //   height: 100,
    //   borderRadius: 50
    // },
    // [theme.breakpoints.only('md')]: {
    //   width: 120,
    //   height: 120,
    //   borderRadius: 60
    // },
    // [theme.breakpoints.only('lg')]: {
    //   width: 140,
    //   height: 140,
    //   borderRadius: 70
    // },
    // [theme.breakpoints.only('xl')]: {
    //   width: 160,
    //   height: 160,
    //   borderRadius: 80
    // },
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: theme.palette.action.disabledBackground
  }
});

class ChangeAvatar extends PureComponent {
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

  getAvatarWidth() {
    switch (this.props.width) {
      case 'xs':
        return 220;
      case 'sm':
        return 240;
      // case 'md':
      //   return 260;
      // case 'lg':
      //   return 280;
      // case 'xl':
      //   return 300;
      default:
        return 300;
    }
  }

  render = () => (
    <Dialog open={this.props.open} onClose={this.handleCancel}>
      <DialogTitle>Change profile photo</DialogTitle>
      <DialogContent>
        <Box className={this.props.classes.outerMargin}>
          <Grid container>
            <Grid item md={8} xs={12}>
              <Box className={this.props.classes.innerPadding}>
                <Box display="flex" justifyContent="center">
                  <AvatarEdit
                    width={this.getAvatarWidth()}
                    // height={240}
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
                </Box>
              </Box>
            </Grid>
            <Grid item md={4} xs={12}>
              <Box className={this.props.classes.innerPadding}>
                <Box mb={2}>
                  <Typography variant="subtitle2">Preview</Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                  {this.state.preview ? (
                    <img alt="Preview" src={this.state.preview} className={this.props.classes.preview} />
                  ) : (
                    <div className={this.props.classes.preview} />
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={this.handleCancel}>Cancel</Button>
        <Button variant="contained" onClick={this.handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

ChangeAvatar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default compose(
  withStyles(styles),
  withWidth()
)(ChangeAvatar);