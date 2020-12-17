import React, { PureComponent } from 'react';
import { InputBase } from '@material-ui/core';
import { fade, withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';

const styles = (theme) => ({
  root: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
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
    borderColor: '#E7ECF2',
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
    fontSize: 13
  }
});

class SearchBox extends PureComponent {
  render = () => (
    <div className={this.props.classes.root}>
      <div className={this.props.classes.icon}>
        <FontAwesomeIcon icon={faSearch} color="#0F996D" size="sm" />
      </div>
      <div className={this.props.classes.icon + ' ' + this.props.classes.rightIcon}>
        <FontAwesomeIcon icon={faChevronDown} color="#CED8E1" size="sm" />
      </div>
      <InputBase
        placeholder="Search"
        classes={{
          root: this.props.classes.inputWrapper,
          input: this.props.classes.inputContent
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  )
}

export default withStyles(styles)(SearchBox);