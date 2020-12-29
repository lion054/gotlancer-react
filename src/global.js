import { Checkbox, Radio, withStyles } from '@material-ui/core';

export const GreenCheckbox = withStyles((theme) => ({
  root: {
    color: theme.palette.divider,
    '&$checked': {
      color: theme.palette.success.main
    }
  },
  checked: {}
}))(Checkbox);

export const GreenRadio = withStyles((theme) => ({
  root: {
    color: theme.palette.divider,
    '&$checked': {
      color: theme.palette.success.main
    }
  },
  checked: {}
}))(Radio);
