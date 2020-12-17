import React, { PureComponent } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MenuButton from './MenuButton';
import SearchBox from './SearchBox';

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  logo: {
    marginRight: theme.spacing(3)
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
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(Header);