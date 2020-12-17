import React, { PureComponent } from 'react';
import { AppBar, Badge, Icon, IconButton, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import AvatarButton from './AvatarButton';
import MenuButton from './MenuButton';
import SearchBox from './SearchBox';

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  logo: {
    marginRight: theme.spacing(3)
  },
  badge: {
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.common.white,
    top: 15,
    right: 15
  }
});

class Header extends PureComponent {
  render = () => (
    <div className={this.props.classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <img alt="" className={this.props.classes.logo} src={require('../assets/images/gotlancer-logo.png')} />
          <MenuButton color="inherit">Projects</MenuButton>
          <MenuButton color="inherit">Hire</MenuButton>
          <MenuButton color="inherit">Reports</MenuButton>
          <SearchBox />
          <div style={{ flex: 1 }} />
          <Badge badgeContent={1} classes={{ badge: this.props.classes.badge }}>
            <IconButton color="inherit">
              <Icon className="fa fa-envelope" style={{ color: '#ADBDCD', fontSize: 24 }} />
            </IconButton>
          </Badge>
          <Badge badgeContent={1} classes={{ badge: this.props.classes.badge }}>
            <IconButton color="inherit">
              <Icon className="fa fa-bell" style={{ color: '#ADBDCD', fontSize: 24 }} />
            </IconButton>
          </Badge>
          <AvatarButton />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(Header);