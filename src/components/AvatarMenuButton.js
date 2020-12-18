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

const styles = (theme) => ({
  root: {
    borderRadius: 20,
    marginLeft: 12
  },
  avatarWrapper: {
    marginLeft: theme.spacing(1.5),
    display: 'inline-block'
  },
  avatarIcon: {
    color: theme.palette.text.disabled,
    fontSize: 32
  },
  menuItem: {
    '&:hover > .MuiListItemIcon-root > svg': {
      color: '#0F996D'
    }
  },
  menuIconWrapper: {
    marginRight: theme.spacing(1),
    justifyContent: 'center'
  },
  menuIcon: {
    color: '#314963',
    fontSize: 20
  },
  menuText: {
    color: '#314963',
    fontSize: 14
  }
});

const TitleTypography = withStyles({
  root: {
    color: '#314963',
    textAlign: 'right'
  }
})(Typography);

const BalanceTypography = withStyles({
  root: {
    color: '#ADBDCD',
    textAlign: 'right'
  }
})(Typography);

class AvatarMenuButton extends PureComponent {
  state = {
    avatarEl: null,
    online: true
  }

  onOpenMenu = (event) => this.setState({ avatarEl: event.currentTarget })

  onCloseMenu = () => this.setState({ avatarEl: null })

  onToggleOnline = () => this.setState({ online: !this.state.online })

  render = () => (
    <Fragment>
      <Button
        className={this.props.classes.root}
        aria-describedby={!!this.state.avatarEl ? 'avatar-popover' : undefined}
        onClick={this.onOpenMenu}
      >
        <div style={{ display: 'inline-block' }}>
          <TitleTypography variant="body2" display="block">Hi, Apurba</TitleTypography>
          <BalanceTypography variant="caption" display="block">$100.00 USD</BalanceTypography>
        </div>
        <div className={this.props.classes.avatarWrapper}>
          <FontAwesomeIcon icon={faUserCircle} className={this.props.classes.avatarIcon} />
        </div>
      </Button>
      <Menu
        id="avatar-menu"
        anchorEl={this.state.avatarEl}
        keepMounted
        open={!!this.state.avatarEl}
        onClose={this.onCloseMenu}
      >
        <MenuItem onClick={this.onCloseMenu} className={this.props.classes.menuItem}>
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

export default withStyles(styles)(AvatarMenuButton);