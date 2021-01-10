import React, { PureComponent } from 'react';
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { FaCog, FaCrown, FaShoppingCart, FaSignOutAlt, FaUser, FaUserCircle } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { updateThemeMode } from '../controllers/app/actions';
import BlueSwitch from '../components/BlueSwitch';
import { formatCurrency } from '../global';

const styles = (theme) => ({
  root: {
    borderRadius: theme.spacing(3)
  },
  optional: {
    marginRight: theme.spacing(0.5),
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  menuItem: {
    paddingRight: theme.spacing(3),
    '&:hover > .MuiListItemIcon-root > .MuiBox-root > svg': {
      color: theme.palette.primary.main
    },
    '&:hover > .MuiListItemText-root > .MuiTypography-root': {
      color: theme.palette.primary.main
    }
  },
  menuIcon: {
    color: theme.palette.text.secondary,
    fontSize: 20
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
    <Box ml={1.5}>
      <Button
        className={this.props.classes.root}
        aria-describedby={!!this.state.avatarEl ? 'avatar-popover' : undefined}
        onClick={this.onOpenMenu}
      >
        <Box className={this.props.classes.optional}>
          <Typography variant="body2" display="block" noWrap align="right">Hi, Apurba</Typography>
          <Typography variant="body2" display="block" noWrap align="right">{formatCurrency(100)}</Typography>
        </Box>
        <Box display="inline-block">
          <Box display="flex" alignItems="center">
            <FaUserCircle size={42} color={this.props.theme.palette.action.active} />
          </Box>
        </Box>
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
            this.props.history.push('/settings');
          }}
          className={this.props.classes.menuItem}
          disableGutters
        >
          <ListItemIcon>
            <Box width="100%" textAlign="center">
              <FaCog className={this.props.classes.menuIcon} />
            </Box>
          </ListItemIcon>
          <ListItemText primary="Settings" primaryTypographyProps={{
            variant: 'body1',
            color: 'textPrimary'
          }} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.onCloseMenu();
            this.props.history.push('/profile');
          }}
          className={this.props.classes.menuItem}
          disableGutters
        >
          <ListItemIcon>
            <Box width="100%" textAlign="center">
              <FaUser className={this.props.classes.menuIcon} />
            </Box>
          </ListItemIcon>
          <ListItemText primary="My Profile" primaryTypographyProps={{
            variant: 'body1',
            color: 'textPrimary'
          }} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.onCloseMenu();
            this.props.history.push('/membership');
          }}
          className={this.props.classes.menuItem}
          disableGutters
        >
          <ListItemIcon>
            <Box width="100%" textAlign="center">
              <FaCrown className={this.props.classes.menuIcon} />
            </Box>
          </ListItemIcon>
          <ListItemText primary="Membership" primaryTypographyProps={{
            variant: 'body1',
            color: 'textPrimary'
          }} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.onCloseMenu();
            this.props.history.push('/buy_bid_credit');
          }}
          className={this.props.classes.menuItem}
          disableGutters
        >
          <ListItemIcon>
            <Box width="100%" textAlign="center">
              <FaShoppingCart className={this.props.classes.menuIcon} />
            </Box>
          </ListItemIcon>
          <ListItemText primary="Buy Bid Credit" primaryTypographyProps={{
            variant: 'body1',
            color: 'textPrimary'
          }} />
        </MenuItem>
        <MenuItem
          onClick={this.onCloseMenu}
          className={this.props.classes.menuItem}
          disableGutters
        >
          <ListItemIcon>
            <Box width="100%" textAlign="center">
              <FaSignOutAlt className={this.props.classes.menuIcon} />
            </Box>
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{
            variant: 'body1',
            color: 'textPrimary'
          }} />
        </MenuItem>
        {/* <MenuItem
          onClick={this.onToggleThemeMode}
          className={this.props.classes.menuItem}
          disableGutters
        >
          <ListItemIcon>
            <BlueSwitch checked={this.props.themeMode === 'dark'} />
          </ListItemIcon>
          <ListItemText primary="Dark Theme" primaryTypographyProps={{
            variant: 'body1',
            color: 'textPrimary'
          }} />
        </MenuItem> */}
        <MenuItem
          onClick={this.onToggleOnline}
          className={this.props.classes.menuItem}
          disableGutters
        >
          <ListItemIcon style={{
            display: 'block',
            textAlign: 'center'
          }}>
            <BlueSwitch size="small" checked={this.state.online} />
          </ListItemIcon>
          <ListItemText primary="Online" primaryTypographyProps={{
            variant: 'body1',
            color: 'textPrimary'
          }} />
        </MenuItem>
      </Menu>
    </Box>
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
  withTheme,
  connect(mapStateToProps, mapDispatchToProps)
)(AvatarMenuButton);