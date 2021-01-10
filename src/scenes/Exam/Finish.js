import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  Typography,
  withStyles,
  withTheme,
  withWidth
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { GreenButton } from '../../global';

const styles = (theme) => ({
  paper: {
    borderRadius: theme.spacing(1.5),
    border: `solid 1px ${theme.palette.divider}`,
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  },
  actionBar: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  },
  progressLabel: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  success: {
    color: theme.palette.success.main
  },
  failure: {
    color: theme.palette.error.main
  }
});

class Finish extends PureComponent {
  state = {
    incorrectQuestions: [
      'What is Gotlancer?',
      'How many days gotlancer take for withdraw money in USA?',
      'What is Gotlancer?',
      'How many days gotlancer take for withdraw money in USA?',
      'What is Gotlancer?',
      'How many days gotlancer take for withdraw money in USA?',
    ]
  }

  render = () => (
    <Box>
      <Paper className={this.props.classes.paper}>
        <Box className={this.props.classes.actionBar}>
          {this.props.success ? (
            <Typography>Your Result: <span className={this.props.classes.success}>Passed</span></Typography>
          ) : (
            <Typography>Your Result: <span className={this.props.classes.failure}>Failed</span></Typography>
          )}
          <Box>
            <Button variant="text" onClick={() => this.props.history.push('/exams')}>Browse Exam</Button>
            <Button variant="contained" onClick={this.props.onReset}>Retake</Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" my={8}>
          <Box position="relative" display="inline-flex" mr={2}>
            <CircularProgress
              variant="determinate"
              size={this.props.width === 'xs' ? 140 : 160}
              thickness={1.5}
              value={70}
              classes={{
                colorPrimary: this.props.success ? this.props.classes.success : this.props.classes.failure
              }}
            />
            <Box className={this.props.classes.progressLabel}>
              <Box textAlign="center" className={this.props.success ? this.props.classes.success : this.props.classes.failure}>
                <Typography variant="h4">70%</Typography>
                <Typography variant="subtitle1">Correct</Typography>
              </Box>
            </Box>
          </Box>
          <Box position="relative" display="inline-flex" ml={2}>
            <CircularProgress
              variant="determinate"
              size={this.props.width === 'xs' ? 140 : 160}
              thickness={1.5}
              value={80}
              classes={{
                colorPrimary: this.props.classes.success
              }}
            />
            <Box className={this.props.classes.progressLabel}>
              <Box textAlign="center" className={this.props.classes.success}>
                <Typography variant="h4">6:36</Typography>
                <Typography variant="subtitle1">Minutes</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {this.props.success && (
          <Box textAlign="center">
            <Box mb={4}>
              <GreenButton variant="contained">Add this certificate at your profile</GreenButton>
            </Box>
            <Box mb={2}>
              <Typography variant="body2">Not happy with this result? <Link href="#">Cancel Result</Link></Typography>
            </Box>
          </Box>
        )}
      </Paper>
      <Box mt={4}>
        <Paper className={this.props.classes.paper}>
          <Typography variant="subtitle1">Incorrect questions</Typography>
          {this.state.incorrectQuestions.map((question, index) => (
            <Box key={index} my={2}>
              <Typography variant="body2">{question}</Typography>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  )
}

Finish.propTypes = {
  onReset: PropTypes.func
}

export default compose(
  withRouter,
  withStyles(styles),
  withTheme,
  withWidth()
)(Finish);