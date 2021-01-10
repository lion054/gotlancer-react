import {
  Button,
  Card,
  Checkbox,
  Radio,
  Tab,
  colors,
  fade,
  withStyles
} from '@material-ui/core';

export const RedButton = withStyles((theme) => ({
  text: {
    color: colors.red[500],
    '&:hover': {
      backgroundColor: fade(colors.red[500], theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  outlined: {
    color: colors.red[500],
    border: `1px solid ${fade(colors.red[500], 0.5)}`,
    '&:hover': {
      border: `1px solid ${colors.red[500]}`,
      backgroundColor: fade(colors.red[500], theme.palette.action.hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  contained: {
    color: theme.palette.common.white,
    backgroundColor: colors.red[500],
    '&:hover': {
      backgroundColor: colors.red[700],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: colors.red[500]
      }
    }
  },
  disabled: {}
}))(Button);

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

export const CompactCard = withStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1.5),
    border: `solid 1px ${theme.palette.divider}`,
    padding: 'unset'
  }
}))(Card);
CompactCard.defaultProps = {
  elevation: 0
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value) + ' USD';
}