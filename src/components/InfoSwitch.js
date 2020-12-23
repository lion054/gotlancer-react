import { Switch, withStyles } from '@material-ui/core';

const styles = (theme) => ({
  switchBase: {
    color: theme.palette.info.main,
    '&$checked': {
      color: theme.palette.info.main
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.info.main
    }
  },
  checked: {},
  track: {}
});

export default withStyles(styles)(Switch);