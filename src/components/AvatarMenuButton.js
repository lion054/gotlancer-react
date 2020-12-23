import React, { Fragment, PureComponent } from 'react';
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faCrown, faShoppingCart, faSignOutAlt, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { updateThemeMode } from '../controllers/app/actions';

const styles = (theme) => ({
  root: {
    borderRadius: theme.spacing(3)
  },
  menuItem: {
    '&:hover > .MuiListItemIcon-root > svg': {
      color: theme.palette.success.main
    }
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
      <Box ml={1.5}>
        <Button
          className={this.props.classes.root}
          aria-describedby={!!this.state.avatarEl ? 'avatar-popover' : undefined}
          onClick={this.onOpenMenu}
        >
          <Box display="inline-block">
            <Typography variant="body2" display="block" noWrap align="right" style={{ color: this.props.textColor }}>Hi, Apurba</Typography>
            <Typography variant="body2" display="block" noWrap align="right" style={{ color: this.props.textColor }}>$100.00 USD</Typography>
          </Box>
          <Box ml={1.5} display="inline-block">
            <FontAwesomeIcon icon={faUserCircle} color={this.props.textColor} size="3x" />
          </Box>
        </Button>
      </Box>
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
          <ListItemIcon>
            <Box mr={1.5} width="100%" textAlign="center">
              <FontAwesomeIcon icon={faCog} color={this.props.theme.palette.text.secondary} size="2x" />
            </Box>
          </ListItemIcon>
          <ListItemText primary="Settings" primaryTypographyProps={{
            variant: 'body1',
            color: 'textPrimary'
          }} />
        </MenuItem>
        <MenuItem onClick={this.onCloseMenu} className={this.props.classes.menuItem}>
          <ListItemIcon>
            <Box mr={1.5} width="100%" textAlign="center">
              <FontAwesomeIcon icon={faUser} color={this.props.theme.palette.text.secondary} size="2x" />
            </Box>
          </ListItemIcon>
          <ListItemText primary="My Profile" primaryTypographyProps={{
            variant: 'body1',
            color: 'textPrimary'
          }} />
        </MenuItem>
        <MenuItem onClick={this.onCloseMenu} className={this.props.classes.menuItem}>
          <ListItemIcon>
            <Box mr={1.5} width="100%" textAlign="center">
              <FontAwesomeIcon icon={faCrown} color={this.props.theme.palette.text.secondary} size="2x" />
            </Box>
          </ListItemIcon>
          <ListItemText primary="Membership" primaryTypographyProps={{
            variant: 'body1',
            color: 'textPrimary'
          }} />
        </MenuItem>
        <MenuItem onClick={this.onCloseMenu} className={this.props.classes.menuItem}>
          <ListItemIcon>
            <Box mr={1.5} width="100%" textAlign="center">
              <FontAwesomeIcon icon={faShoppingCart} color={this.props.theme.palette.text.secondary} size="2x" />
            </Box>
          </ListItemIcon>
          <ListItemText primary="Buy Bid Credit" primaryTypographyProps={{
            variant: 'body1',
            color: 'textPrimary'
          }} />
        </MenuItem>
        <MenuItem onClick={this.onCloseMenu} className={this.props.classes.menuItem}>
          <ListItemIcon>
            <Box mr={1.5} width="100%" textAlign="center">
              <FontAwesomeIcon icon={faSignOutAlt} color={this.props.theme.palette.text.secondary} size="2x" />
            </Box>
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{
            variant: 'body1',
            color: 'textPrimary'
          }} />
        </MenuItem>
        {/* <MenuItem onClick={this.onToggleThemeMode} className={this.props.classes.menuItem}>
          <ListItemIcon>
            <Switch checked={this.props.themeMode === 'dark'} />
          </ListItemIcon>
          <ListItemText primary="Dark Theme" primaryTypographyProps={{
            variant: 'body1',
            color: 'textPrimary'
          }} />
        </MenuItem> */}
        <MenuItem onClick={this.onToggleOnline} className={this.props.classes.menuItem}>
          <ListItemIcon>
            <Switch checked={this.state.online} />
          </ListItemIcon>
          <ListItemText primary="Online" primaryTypographyProps={{
            variant: 'body1',
            color: 'textPrimary'
          }} />
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
  withTheme,
  connect(mapStateToProps, mapDispatchToProps)
)(AvatarMenuButton);