import React, { PureComponent } from 'react';
import { Avatar, ButtonBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const styles = (theme) => ({
  root: {
    borderRadius: 20,
    paddingLeft: 12
  },
  title: {
    color: '#314963',
    fontSize: 16,
    textAlign: 'right'
  },
  subtitle: {
    color: '#ADBDCD',
    fontSize: 14,
    textAlign: 'right'
  },
  avatarWrapper: {
    display: 'inline-block',
    marginLeft: theme.spacing(2)
  },
  avatar: {
    backgroundColor: 'transparent',
    color: theme.palette.text.disabled,
    '&:hover': {
      color: theme.palette.grey.dark
    }
  },
  icon: {
    fontSize: 32
  }
});

class AvatarButton extends PureComponent {
  render = () => (
    <ButtonBase
      className={this.props.className + ' ' + this.props.classes.root}
      aria-describedby={this.props['aria-describedby']}
      onClick={this.props.onClick}
    >
      <div style={{ display: 'inline-block' }}>
        <div className={this.props.classes.title}>Hi, Apurba</div>
        <div className={this.props.classes.subtitle}>$100.00 USD</div>
      </div>
      <div className={this.props.classes.avatarWrapper}>
        <Avatar className={this.props.classes.avatar}>
          <FontAwesomeIcon icon={faUserCircle} className={this.props.classes.icon} />
        </Avatar>
      </div>
    </ButtonBase>
  )
}

export default withStyles(styles)(AvatarButton);