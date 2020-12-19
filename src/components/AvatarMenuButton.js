import React, { Fragment, PureComponent } from 'react';
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Typography,
  withStyles
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faCrown, faShoppingCart, faSignOutAlt, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { updateThemeMode } from '../controllers/app/actions';

const styles = (theme) => ({
  root: {
    borderRadius: theme.spacing(3),
    marginLeft: theme.spacing(1.5)
  },
  avatarWrapper: {
    marginLeft: theme.spacing(1.5),
    display: 'inline-block'
  },
  avatarIcon: {
    color: theme.palette.text.secondary
  },
  menuItem: {
    '&:hover > .MuiListItemIcon-root > svg': {
      color: theme.palette.success.main
    }
  },
  menuIconWrapper: {
    marginRight: theme.spacing(1),
    justifyContent: 'center'
  },
  menuIcon: {
    color: theme.palette.text.secondary,
    fontSize: theme.spacing(2.5)
  },
  menuText: {
    color: theme.palette.text.primary,
    fontSize: theme.spacing(1.9)
  }
});

class AvatarMenuButton extends PureComponent {
  state = {
    avatarEl: null,
    online: true
  }

  onOpenMenu = (event) => this.setState({ avatarEl: event.currentTarget })

  onCloseMenu = () => this.setState({ avatarEl: null })

  onToggleOnline = () => this.setState({ online: !this.state.online })

  onToggleThemeMode = () => {
    if (this.props.themeMode === 'dark') {
      this.props.updateThemeMode('light');
    } else {
      this.props.updateThemeMode('dark');
    }
  }

  render = () => (
    <Fragment>
      <Button
        className={this.props.classes.root}
        aria-describedby={!!this.state.avatarEl ? 'avatar-popover' : undefined}
        onClick={this.onOpenMenu}
      >
        <div style={{ display: 'inline-block' }}>
          <Typography variant="body2" display="block" color="textPrimary" noWrap align="right">Hi, Apurba</Typography>
          <Typography variant="body2" display="block" color="textSecondary" noWrap align="right">$100.00 USD</Typography>
        </div>
        <div className={this.props.classes.avatarWrapper}>
          <FontAwesomeIcon icon={faUserCircle} className={this.props.classes.avatarIcon} size="3x" />
        </div>
      </Button>
      <Menu
        id="avatar-menu"
        anchorEl={this.state.avatarEl}
        keepMounted
        open={!!this.state.avatarEl}
        onClose={this.onCloseMenu}
        getContentAnchorEl={null} // menu should be display below anchor
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // menu should be display below anchor
      >
        <MenuItem
          onClick={() => {
            this.onCloseMenu();
            this.props.history.push('/account_settings');
          }}
          className={this.props.classes.menuItem}
        >
          <ListItemIcon className={this.props.classes.menuIconWrapper}>
            <FontAwesomeIcon icon={faCog} className={this.props.classes.menuIcon} />
          </ListItemIcon>
          <ListItemText classes={{ primary: this.props.classes.menuText }} primary="Settings" />
        </MenuItem>
        <MenuItem onClick={this.onCloseMenu} className={this.props.classes.menuItem}>
          <ListItemIcon className={this.props.classes.menuIconWrapper}>
            <FontAwesomeIcon icon={faUser} className={this.props.classes.menuIcon} />
          </ListItemIcon>
          <ListItemText classes={{ primary: this.props.classes.menuText }} primary="My Profile" />
        </MenuItem>
        <MenuItem onClick={this.onCloseMenu} className={this.props.classes.menuItem}>
          <ListItemIcon className={this.props.classes.menuIconWrapper}>
            <FontAwesomeIcon icon={faCrown} className={this.props.classes.menuIcon} />
          </ListItemIcon>
          <ListItemText classes={{ primary: this.props.classes.menuText }} primary="Membership" />
        </MenuItem>
        <MenuItem onClick={this.onCloseMenu} className={this.props.classes.menuItem}>
          <ListItemIcon className={this.props.classes.menuIconWrapper}>
            <FontAwesomeIcon icon={faShoppingCart} className={this.props.classes.menuIcon} />
          </ListItemIcon>
          <ListItemText classes={{ primary: this.props.classes.menuText }} primary="Buy Bid Credit" />
        </MenuItem>
        <MenuItem onClick={this.onCloseMenu} className={this.props.classes.menuItem}>
          <ListItemIcon className={this.props.classes.menuIconWrapper}>
            <FontAwesomeIcon icon={faSignOutAlt} className={this.props.classes.menuIcon} />
          </ListItemIcon>
          <ListItemText classes={{ primary: this.props.classes.menuText }} primary="Logout" />
        </MenuItem>
        <MenuItem onClick={this.onToggleThemeMode} className={this.props.classes.menuItem}>
          <ListItemIcon className={this.props.classes.menuIconWrapper}>
            <Switch checked={this.props.themeMode === 'dark'} />
          </ListItemIcon>
          <ListItemText classes={{ primary: this.props.classes.menuText }} primary="Dark Mode" />
        </MenuItem>
        <MenuItem onClick={this.onToggleOnline} className={this.props.classes.menuItem}>
          <ListItemIcon className={this.props.classes.menuIconWrapper}>
            <Switch checked={this.state.online} />
          </ListItemIcon>
          <ListItemText classes={{ primary: this.props.classes.menuText }} primary="Online" />
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

const mapStateToProps = ({
  app: { themeMode }
}) => ({
  themeMode
});

const mapDispatchToProps = (dispacth) => ({
  updateThemeMode: (mode) => dispacth(updateThemeMode(mode))
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AvatarMenuButton);