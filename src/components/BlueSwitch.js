import { Switch, withStyles } from '@material-ui/core';

const styles = (theme) => ({
  switchBase: {
    color: theme.palette.primary.main,
    '&$checked': {
      color: theme.palette.primary.main
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.primary.main
    }
  },
  checked: {},
  track: {}
});

export default withStyles(styles)(Switch);