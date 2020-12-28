import { Checkbox, withStyles } from '@material-ui/core';

export const GreenCheckbox = withStyles((theme) => ({
  root: {
    color: theme.palette.divider,
    '&$checked': {
      color: theme.palette.success.main
    }
  },
  checked: {}
}))(Checkbox);
