import React, { PureComponent } from 'react';
import {
  Box,
  Divider,
  IconButton,
  OutlinedInput,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { AttachFile, Send } from '@material-ui/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import { compose } from 'redux';

const styles = (theme) => ({
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  comment: {
    marginTop: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.text.secondary
  },
  status: {
    boxSizing: 'border-box',
    width: 20,
    height: 20,
    borderRadius: 10,
    border: `solid 2px ${theme.palette.common.white}`,
    position: 'absolute',
    top: 44,
    left: 44
  }
});

class CommentRoom extends PureComponent {
  render = () => (
    <Box>
      {this.props.records.map(({ author, text, time }, index) => (
        <Box key={index} display="flex" mt={2}>
          <Box position="relative" mr={2}>
            <img
              alt=""
              src={author.isAdmin ? require('../assets/images/gl-logo-black.svg') : author.avatar}
              className={this.props.classes.avatar}
            />
            <Box
              className={this.props.classes.status}
              bgcolor={this.props.theme.palette.success.main}
            />
          </Box>
          <Box flex={1}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">{author.name}</Typography>
              <Typography variant="body2">{moment(time).fromNow()}</Typography>
            </Box>
            <Box className={this.props.classes.comment}>
              <Typography variant="body2">{text}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
      <Box mt={2}>
        <Divider />
      </Box>
      <Box display="flex" p={1} bgcolor={this.props.theme.palette.background.default}>
        <IconButton>
          <AttachFile />
        </IconButton>
        <OutlinedInput
          fullWidth
          margin="dense"
          style={{
            backgroundColor: this.props.theme.palette.common.white
          }}
        />
        <IconButton>
          <Send />
        </IconButton>
      </Box>
    </Box>
  )
}

CommentRoom.propTypes = {
  creator: PropTypes.object,
  accused: PropTypes.object,
  admin: PropTypes.object,
  records: PropTypes.array
}

export default compose(
  withStyles(styles),
  withTheme
)(CommentRoom);