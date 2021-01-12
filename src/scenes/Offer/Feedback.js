import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  OutlinedInput,
  Typography,
  withStyles,
  withTheme,
  withWidth
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { compose } from 'redux';

import SideBar from './SideBar';
import { CompactCard } from '../../global';

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

class Feedback extends PureComponent {
  render = () => (
    <Box className={this.props.classes.outerMargin}>
      <Grid container>
        <Grid item md={9} xs={12}>
          <Box className={this.props.classes.innerPadding}>
            <CompactCard>
              <CardHeader
                title={(
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography variant="subtitle2">Provide feedback to designer</Typography>
                      <Typography variant="body2">Write your experience with this designer</Typography>
                    </Box>
                    <Button variant="contained">Pay Tip</Button>
                  </Box>
                )}
              />
              <Divider />
              <CardContent>
                <Box mb={2}>
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
                <Box mt={4}>
                  <Button variant="contained" size="large">Submit Feedback</Button>
                </Box>
              </CardContent>
            </CompactCard>
          </Box>
        </Grid>
        <Grid item md={3} xs={12}>
          <SideBar />
        </Grid>
      </Grid>
    </Box>
  )
}

export default compose(
  withStyles(styles),
  withTheme,
  withWidth()
)(Feedback);