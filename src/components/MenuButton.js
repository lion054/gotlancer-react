import { Button, withStyles } from '@material-ui/core';

import { getHeaderHoverBackgroundColor } from '../themes';

const styles = (theme) => ({
  root: {
    fontSize: theme.spacing(1.75),
    fontWeight: 600,
    color: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300],
    '&:hover': {
      backgroundColor: getHeaderHoverBackgroundColor(theme)
    }
  }
});

export default withStyles(styles)(Button);