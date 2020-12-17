import React, { Fragment, PureComponent } from 'react';
import {
  Avatar,
  ButtonBase,
  ClickAwayListener,
  Grow,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Switch,
  withStyles
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faCrown, faShoppingCart, faSignOutAlt, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';

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
    fontSize: 24
  }
});

class AvatarButton extends PureComponent {
  state = {
    avatarEl: null,
    online: true
  }

  onOpenAvatar = (event) => this.setState({ avatarEl: event.currentTarget })

  onCloseAvatar = () => this.setState({ avatarEl: null })

  onToggleOnline = () => this.setState({ online: !this.state.online })

  render = () => (
    <Fragment>
      <ButtonBase
        className={this.props.classes.root}
        aria-describedby={!!this.state.avatarEl ? 'avatar-popover' : undefined}
        onClick={this.onOpenAvatar}
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
      <Popper
        open={!!this.state.avatarEl}
        anchorEl={this.state.avatarEl}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={this.onCloseAvatar}>
                <MenuList autoFocusItem={!!this.state.avatarEl} id="avatar-menu-list">
                  <MenuItem onClick={this.onCloseAvatar} className={this.props.classes.menuItem}>
                    <ListItemIcon className={this.props.classes.menuIconWrapper}>
                      <FontAwesomeIcon icon={faCog} className={this.props.classes.menuIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </MenuItem>
                  <MenuItem onClick={this.onCloseAvatar} className={this.props.classes.menuItem}>
                    <ListItemIcon className={this.props.classes.menuIconWrapper}>
                      <FontAwesomeIcon icon={faUser} className={this.props.classes.menuIcon} />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                  </MenuItem>
                  <MenuItem onClick={this.onCloseAvatar} className={this.props.classes.menuItem}>
                    <ListItemIcon className={this.props.classes.menuIconWrapper}>
                      <FontAwesomeIcon icon={faCrown} className={this.props.classes.menuIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Membership" />
                  </MenuItem>
                  <MenuItem onClick={this.onCloseAvatar} className={this.props.classes.menuItem}>
                    <ListItemIcon className={this.props.classes.menuIconWrapper}>
                      <FontAwesomeIcon icon={faShoppingCart} className={this.props.classes.menuIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Buy Bid Credit" />
                  </MenuItem>
                  <MenuItem onClick={this.onCloseAvatar} className={this.props.classes.menuItem}>
                    <ListItemIcon className={this.props.classes.menuIconWrapper}>
                      <FontAwesomeIcon icon={faSignOutAlt} className={this.props.classes.menuIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                  <MenuItem onClick={this.onToggleOnline} className={this.props.classes.menuItem}>
                    <ListItemIcon className={this.props.classes.menuIconWrapper}>
                      <Switch checked={this.state.online} />
                    </ListItemIcon>
                    <ListItemText primary="Online" />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  )
}

export default withStyles(styles)(AvatarButton);