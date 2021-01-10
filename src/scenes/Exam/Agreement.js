import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  colors,
  withStyles,
  withTheme
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { compose } from 'redux';

const styles = (theme) => ({
  paper: {
    borderRadius: theme.spacing(1.5),
    border: `solid 1px ${theme.palette.divider}`,
    padding: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1)
    }
  }
});

class Agreement extends PureComponent {
  render = () => (
    <Paper className={this.props.classes.paper}>
      <Typography variant="subtitle1">Agreement</Typography>
      <Box my={2}>
        <Typography variant="body2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</Typography>
        <Typography variant="body2">Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</Typography>
        <Typography variant="body2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</Typography>
      </Box>
      <Box
        border={`solid 1px ${colors.yellow[700]}`}
        borderRadius={this.props.theme.spacing(1)}
        bgcolor={colors.yellow[50]}
        p={2}
      >
        <Typography variant="body1">Note</Typography>
        <Typography variant="body2">1. You must me complete exam within timeline.</Typography>
        <Typography variant="body2">2. You must be provide at least 70% correct answer.</Typography>
        <Typography variant="body2">3. You retake this exam again, but that time user’s also need to buy that question for retake.</Typography>
      </Box>
      <Box mt={4} textAlign="right">
        <Button variant="contained" onClick={this.props.onStart}>I agree and start exam</Button>
      </Box>
    </Paper>
  )
}

Agreement.propTypes = {
  onStart: PropTypes.func
}

export default compose(
  withStyles(styles),
  withTheme
)(Agreement);