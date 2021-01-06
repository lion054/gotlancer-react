import { Button, Checkbox, Radio, Tab, colors, fade, withStyles } from '@material-ui/core';

export const GreenButton = withStyles((theme) => ({
  text: {
    color: colors.green[500],
    '&:hover': {
      backgroundColor: fade(colors.green[500], theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  outlined: {
    color: colors.green[500],
    border: `1px solid ${fade(colors.green[500], 0.5)}`,
    '&:hover': {
      border: `1px solid ${colors.green[500]}`,
      backgroundColor: fade(colors.green[500], theme.palette.action.hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  contained: {
    color: theme.palette.common.white,
    backgroundColor: colors.green[500],
    '&:hover': {
      backgroundColor: colors.green[700],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: colors.green[500]
      }
    }
  },
  disabled: {}
}))(Button);

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

export const CompactTab = withStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      minWidth: 'unset'
    }
  }
}))(Tab);

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value) + ' USD';
}