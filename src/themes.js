import { colors, createMuiTheme } from '@material-ui/core';

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
    MuiCardHeader: {
      root: {
        padding: '8px 16px'
      }
    },
    MuiCardContent: {
      root: {
        '&:last-child': {
          paddingBottom: 16
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
    MuiCardHeader: {
      root: {
        padding: '8px 16px'
      }
    },
    MuiCardContent: {
      root: {
        '&:last-child': {
          paddingBottom: 16
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
