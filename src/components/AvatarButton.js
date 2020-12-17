import React, { PureComponent } from 'react';
import { Avatar, ButtonBase, Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
  }
});

class AvatarButton extends PureComponent {
  render = () => (
    <ButtonBase className={this.props.className + ' ' + this.props.classes.root}>
      <div style={{ display: 'inline-block' }}>
        <div className={this.props.classes.title}>Hi, Apurba</div>
        <div className={this.props.classes.subtitle}>$100.00 USD</div>
      </div>
      <div className={this.props.classes.avatarWrapper}>
        <Avatar className={this.props.classes.avatar}>
          <Icon className="fa fa-user-circle" style={{ fontSize: 32 }} />
        </Avatar>
      </div>
    </ButtonBase>
  )
}

export default withStyles(styles)(AvatarButton);