import React, { PureComponent } from 'react';
import { Box, withStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  score: {
    [theme.breakpoints.only('xs')]: {
      position: 'relative',
      top: -3
    },
    marginRight: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0, 0.5),
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
    fontSize: 12
  }
});

class ScoreReview extends PureComponent {
  render = () => (
    <Box display="flex" alignItems="center" mr={1}>
      <span className={this.props.classes.score}>{this.props.value}</span>
      <Rating name="read-only" value={this.props.value} readOnly size="small" />
    </Box>
  )
}

ScoreReview.propTypes = {
  value: PropTypes.number
}

export default withStyles(styles)(ScoreReview);