import React, { Fragment, PureComponent } from 'react';
import {
  Drawer,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  withStyles
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const styles = (theme) => ({
  avatarIcon: {
    color: theme.palette.text.disabled,
    fontSize: 60,
    marginRight: 27
  },
  title: {
    color: '#314963',
    fontSize: 25
  },
  subtitle: {
    color: '#ADBDCD',
    fontSize: 25
  },
  label: {
    color: '#314963',
    fontSize: 24
  }
});

class AvatarMenuIcon extends PureComponent {
  state = {
    drawerOpened: false
  }

  onToggleDrawer = () => this.setState({ drawerOpened: !this.state.drawerOpened })

  render = () => (
    <Fragment>
      <IconButton color="inherit" onClick={this.onToggleDrawer}>
        <FontAwesomeIcon icon={faUserCircle} className={this.props.classes.avatarIcon} />
      </IconButton>
      <Drawer
        anchor="right"
        open={this.state.drawerOpened}
        onClose={this.onToggleDrawer}
      >
        <MenuList>
          <MenuItem onClick={this.onToggleDrawer}>
            <div className={this.props.classes.avatarWrapper}>
              <FontAwesomeIcon icon={faUserCircle} className={this.props.classes.avatarIcon} />
            </div>
            <div style={{ display: 'inline-block' }}>
              <div className={this.props.classes.title}>Hi, Apurba</div>
              <div className={this.props.classes.subtitle}>$100.00 USD</div>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem className={this.props.classes.label} onClick={this.onToggleDrawer}>Settings</MenuItem>
          <Divider />
          <MenuItem className={this.props.classes.label} onClick={this.onToggleDrawer}>My Profile</MenuItem>
          <Divider />
          <MenuItem className={this.props.classes.label} onClick={this.onToggleDrawer}>Membership</MenuItem>
        </MenuList>
      </Drawer>
    </Fragment>
  )
}

export default withStyles(styles)(AvatarMenuIcon);