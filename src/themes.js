import { colors, createMuiTheme, fade } from '@material-ui/core';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light'
  },
  overrides: {
    MuiButton: {
      text: {
        fontWeight: 'bold',
        textTransform: 'unset'
      },
      contained: {
        fontWeight: 'bold',
        textTransform: 'unset',
        backgroundColor: colors.grey[900],
        color: colors.common.white,
        '&:hover': {
          backgroundColor: colors.grey[600]
        }
      },
      outlined: {
        fontWeight: 'bold',
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
    },
    MuiTypography: {
      h1: {
        fontWeight: 'bold'
      },
      h2: {
        fontWeight: 'bold'
      },
      h3: {
        fontWeight: 'bold'
      },
      h4: {
        fontWeight: 'bold'
      },
      h5: {
        fontWeight: 'bold'
      },
      h6: {
        fontWeight: 'bold'
      },
      subtitle1: {
        fontWeight: 'bold'
      },
      subtitle2: {
        fontWeight: 'bold'
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
        fontWeight: 'bold',
        textTransform: 'unset'
      },
      contained: {
        fontWeight: 'bold',
        textTransform: 'unset',
        backgroundColor: colors.grey[900],
        color: colors.common.white,
        '&:hover': {
          backgroundColor: colors.grey[600]
        }
      },
      outlined: {
        fontWeight: 'bold',
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
    },
    MuiTypography: {
      h1: {
        fontWeight: 'bold'
      },
      h2: {
        fontWeight: 'bold'
      },
      h3: {
        fontWeight: 'bold'
      },
      h4: {
        fontWeight: 'bold'
      },
      h5: {
        fontWeight: 'bold'
      },
      h6: {
        fontWeight: 'bold'
      },
      subtitle1: {
        fontWeight: 'bold'
      },
      subtitle2: {
        fontWeight: 'bold'
      }
    }
  }
});

export const getHeaderHoverBackgroundColor = (theme) => fade(theme.palette.grey[800], 1 - theme.palette.action.hoverOpacity);
