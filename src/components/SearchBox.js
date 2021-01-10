import React, { PureComponent } from 'react';
import { InputBase, fade, withTheme, withStyles } from '@material-ui/core';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import { compose } from 'redux';

const styles = (theme) => ({
  root: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.background.paper, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.background.paper, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  icon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightIcon: {
    right: 0
  },
  inputWrapper: {
    borderColor: theme.palette.divider,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: theme.shape.borderRadius
  },
  inputContent: {
    paddingTop: theme.spacing(1),
    paddingRight: `calc(1em + ${theme.spacing(2.5)}px)`,
    paddingBottom: theme.spacing(1),
    paddingLeft: `calc(1em + ${theme.spacing(2.5)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '28ch'
      }
    },
    fontSize: theme.spacing(1.75)
  }
});

class SearchBox extends PureComponent {
  render = () => (
    <div className={this.props.classes.root}>
      <div className={this.props.classes.icon}>
        <FaSearch color={this.props.textColor} size={20} />
      </div>
      <div className={this.props.classes.icon + ' ' + this.props.classes.rightIcon}>
        <FaChevronDown color={this.props.textColor} size={20} />
      </div>
      <InputBase
        placeholder="Search"
        classes={{
          root: this.props.classes.inputWrapper,
          input: this.props.classes.inputContent
        }}
        inputProps={{
          'aria-label': 'search',
          style: {
            color: this.props.textColor
          }
        }}
      />
    </div>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(SearchBox);