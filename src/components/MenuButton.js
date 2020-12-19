import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    color: theme.palette.text.primary,
    fontSize: theme.spacing(1.75),
    fontWeight: 600
  }
});

export default withStyles(styles)(Button);