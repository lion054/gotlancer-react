import React, { PureComponent } from 'react';
import {
  AppBar,
  Badge,
  ClickAwayListener,
  Grow,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Switch,
  Toolbar
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faCrown, faEnvelope, faShoppingCart, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
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
    right: 'unset',
    left: 15
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
    color: '#ADBDCD',
    fontSize: 24
  }
});

class Header extends PureComponent {
  state = {
    projectsEl: null,
    hireEl: null,
    reportsEl: null,
    avatarEl: null,
    online: true
  }

  onOpenProjects = (event) => this.setState({ projectsEl: event.currentTarget })

  onCloseProjects = () => this.setState({ projectsEl: null })

  onOpenHire = (event) => this.setState({ hireEl: event.currentTarget })

  onCloseHire = () => this.setState({ hireEl: null })

  onOpenReports = (event) => this.setState({ reportsEl: event.currentTarget })

  onCloseReports = () => this.setState({ reportsEl: null })

  onOpenAvatar = (event) => this.setState({ avatarEl: event.currentTarget })

  onCloseAvatar = () => this.setState({ avatarEl: null })

  getAvatarPopoverId = () => !!this.state.avatarEl ? 'avatar-popover' : undefined

  onToggleOnline = () => this.setState({ online: !this.state.online })

  render = () => (
    <div className={this.props.classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <img alt="" className={this.props.classes.logo} src={require('../assets/images/gotlancer-logo.png')} />
          <MenuButton color="inherit" onClick={this.onOpenProjects}>Projects</MenuButton>
          <Menu
            id="projects-menu"
            anchorEl={this.state.projectsEl}
            keepMounted
            open={!!this.state.projectsEl}
            onClose={this.onCloseProjects}
          >
            <MenuItem>Find Work</MenuItem>
            <MenuItem>Saved Jobs</MenuItem>
            <MenuItem>Proposals</MenuItem>
            <MenuItem>My Stats</MenuItem>
            <MenuItem>My Project</MenuItem>
          </Menu>
          <MenuButton color="inherit" onClick={this.onOpenHire}>Hire</MenuButton>
          <Menu
            id="hire-menu"
            anchorEl={this.state.hireEl}
            keepMounted
            open={!!this.state.hireEl}
            onClose={this.onCloseHire}
          >
            <MenuItem>Find Freelancer</MenuItem>
            <MenuItem>Saved Freelancer</MenuItem>
            <MenuItem>Hired Freelancer</MenuItem>
          </Menu>
          <MenuButton color="inherit" onClick={this.onOpenReports}>Reports</MenuButton>
          <Menu
            id="reports-menu"
            anchorEl={this.state.reportsEl}
            keepMounted
            open={!!this.state.reportsEl}
            onClose={this.onCloseReports}
          >
            <MenuItem>Overview</MenuItem>
            <MenuItem>My Reports</MenuItem>
            <MenuItem>Proposal History</MenuItem>
            <MenuItem>Transaction History</MenuItem>
            <MenuItem>Payment History</MenuItem>
            <MenuItem>Withdrawal History</MenuItem>
            <MenuItem>Dispute List</MenuItem>
          </Menu>
          <SearchBox />
          <div style={{ flex: 1 }} />
          <Badge badgeContent={100} classes={{ badge: this.props.classes.badge }}>
            <IconButton color="inherit">
              <FontAwesomeIcon icon={faEnvelope} color="#ADBDCD" size="1x" />
            </IconButton>
          </Badge>
          <Badge badgeContent={5} classes={{ badge: this.props.classes.badge }}>
            <IconButton color="inherit">
              <FontAwesomeIcon icon={faBell} color="#ADBDCD" size="1x" />
            </IconButton>
          </Badge>
          <AvatarButton
            aria-describedby={this.getAvatarPopoverId()}
            onClick={this.onOpenAvatar}
          />
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
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(Header);