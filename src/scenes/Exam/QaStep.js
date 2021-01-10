import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { WatchLater } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { RedButton } from '../../global';

const styles = (theme) => ({
  paper: {
    borderRadius: theme.spacing(1.5),
    border: `solid 1px ${theme.palette.divider}`,
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  },
  outerMargin: {
    margin: theme.spacing(-2),
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(-1)
    }
  },
  innerPadding: {
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
    }
  }
});

class QaStep extends PureComponent {
  state = {
    answerRadio: -1
  }

  render = () => (
    <Paper className={this.props.classes.paper}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">Question 22 of 40</Typography>
        <Box display="flex">
          <WatchLater htmlColor={this.props.theme.palette.action.active} />
          <Box color={this.props.theme.palette.success.main} ml={1}>
            <Typography variant="body1">01:16:52</Typography>
          </Box>
        </Box>
      </Box>
      <Box my={8}>
        <Grid container>
          <Grid item md={6} xs={12}>
            <Box className={this.props.classes.innerPadding}>
              <Box mb={2}>
                <Typography variant="subtitle2">Question</Typography>
              </Box>
              <Typography variant="body2">{this.props.question}</Typography>
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box className={this.props.classes.innerPadding}>
              <Box mb={2}>
                <Typography variant="subtitle2">Your answer</Typography>
              </Box>
              {this.props.multiple ? (
                <Box>
                  {this.props.answers.map((answer, index) => (
                    <Box key={index}>
                      <FormControlLabel
                        value={index}
                        control={(
                          <Checkbox onClick={(e) => e.stopPropagation()} />
                        )}
                        label={<Typography variant="body2">{answer}</Typography>}
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                <RadioGroup value={this.state.answerRadio} onChange={(e) => this.setState({ answerRadio: e.target.value })}>
                  {this.props.answers.map((answer, index) => (
                    <FormControlLabel
                      key={index}
                      value={index}
                      control={(
                        <Radio onClick={(e) => e.stopPropagation()} />
                      )}
                      label={<Typography variant="body2">{answer}</Typography>}
                    />
                  ))}
                </RadioGroup>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={this.props.classes.actionBar}>
        <Box>
          <Button variant="contained" onClick={this.props.onNext}>Confirm &amp; Next</Button>
          <Button variant="outlined" onClick={this.props.onSkip}>Skip, I will try later</Button>
        </Box>
        <RedButton variant="text">Report this question</RedButton>
      </Box>
    </Paper>
  )
}

QaStep.propTypes = {
  onNext: PropTypes.func,
  onSkip: PropTypes.func
}

export default compose(
  withStyles(styles),
  withTheme
)(QaStep);