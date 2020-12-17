import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    color: '#314963',
    fontSize: 12,
    fontWeight: 600
  }
});

export default withStyles(styles)(Button);