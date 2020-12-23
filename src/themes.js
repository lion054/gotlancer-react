import { colors, createMuiTheme } from '@material-ui/core';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light'
  },
  overrides: {
    MuiButton: {
      text: {
        textTransform: 'unset'
      },
      contained: {
        textTransform: 'unset',
        backgroundColor: colors.grey[900],
        color: colors.common.white,
        '&:hover': {
          backgroundColor: colors.grey[600]
        }
      },
      outlined: {
        textTransform: 'unset'
      }
    },
    MuiOutlinedInput: {
      root: {
        '&:hover $notchedOutline': {
          borderColor: colors.green[300]
        },
        '&$focused $notchedOutline': {
          borderColor: colors.green[500]
        }
      }
    },
    MuiInputLabel: {
      outlined: {
        '&$shrink': {
          color: colors.green[500]
        }
      }
    },
    MuiTab: {
      textColorInherit: {
        color: 'rgba(0, 0, 0, 0.87)',
        '&$selected': {
          color: colors.green[500]
        }
      }
    },
    MuiTabs: {
      indicator: {
        backgroundColor: colors.green[500]
      }
    }
  }
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  overrides: {
    MuiButton: {
      text: {
        textTransform: 'unset'
      },
      contained: {
        textTransform: 'unset',
        backgroundColor: colors.grey[900],
        color: colors.common.white,
        '&:hover': {
          backgroundColor: colors.grey[600]
        }
      },
      outlined: {
        textTransform: 'unset'
      }
    },
    MuiOutlinedInput: {
      root: {
        '&:hover $notchedOutline': {
          borderColor: colors.green[300]
        },
        '&$focused $notchedOutline': {
          borderColor: colors.green[500]
        }
      }
    },
    MuiInputLabel: {
      outlined: {
        '&$shrink': {
          color: colors.green[500]
        }
      }
    },
    MuiTab: {
      textColorInherit: {
        color: colors.common.white,
        '&$selected': {
          color: colors.green[500]
        }
      }
    },
    MuiTabs: {
      indicator: {
        backgroundColor: colors.green[500]
      }
    }
  }
});
