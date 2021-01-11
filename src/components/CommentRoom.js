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

import UserAvatar from '../components/UserAvatar';

const styles = (theme) => ({
  comment: {
    marginTop: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.text.secondary
  }
});

class CommentRoom extends PureComponent {
  render = () => (
    <Box>
      {this.props.records.map(({ author, text, time }, index) => (
        <Box key={index} display="flex" mt={2}>
          <UserAvatar
            url={author.isAdmin ? require('../assets/images/gl-logo-black.svg') : author.avatar}
            online
            size={this.props.theme.spacing(8)}
            sizeSM={this.props.theme.spacing(6)}
            marginRight={this.props.theme.spacing(2)}
            marginRightSM={this.props.theme.spacing(1)}
          />
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