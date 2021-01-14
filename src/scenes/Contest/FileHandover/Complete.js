import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Divider,
  OutlinedInput,
  Typography,
  withStyles,
  withTheme,
  withWidth
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { compose } from 'redux';

const styles = (theme) => ({
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
  }
});

class Complete extends PureComponent {
  render = () => (
    <Box className={this.props.classes.innerPadding}>
      <Box my={2} display="flex">
        <Box flex={1}>
          <Typography variant="subtitle2">Provide feedback to designer</Typography>
          <Typography variant="body2">Write your experience with this designer</Typography>
        </Box>
        <Button variant="contained" size="large">Pay Tip</Button>
      </Box>
      <Divider />
      <Box my={2}>
        <Typography variant="body1">Your feedback</Typography>
      </Box>
      <Rating name="simple-controlled" size="large" />
      <Box mt={4} mb={1}>
        <Typography variant="body1">Your comment</Typography>
      </Box>
      <OutlinedInput
        fullWidth
        margin="dense"
        multiline
        rows={5}
      />
      <Box my={4}>
        <Button variant="contained" size="large">Submit Feedback</Button>
      </Box>
    </Box>
  )
}

export default compose(
  withStyles(styles),
  withTheme,
  withWidth()
)(Complete);