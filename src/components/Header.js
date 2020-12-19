import React, { PureComponent } from 'react';
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  withStyles,
  withTheme,
  withWidth
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { compose } from 'redux';

import AvatarMenuButton from './AvatarMenuButton';
import AvatarMenuIcon from './AvatarMenuIcon';
import MenuButton from './MenuButton';
import SearchBox from './SearchBox';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
  },
  logo: {
    width: theme.spacing(16),
    height: theme.spacing(4),
    marginRight: theme.spacing(3)
  },
  badge: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    top: theme.spacing(2),
    right: 'unset',
    left: theme.spacing(2)
  },
  label: {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.success.main
    },
    fontSize: theme.spacing(1.75)
  }
});

class Header extends PureComponent {
  state = {
    projectsEl: null,
    hireEl: null,
    reportsEl: null,
    drawerOpened: false
  }

  onOpenProjects = (event) => this.setState({ projectsEl: event.currentTarget })

  onCloseProjects = () => this.setState({ projectsEl: null })

  onOpenHire = (event) => this.setState({ hireEl: event.currentTarget })

  onCloseHire = () => this.setState({ hireEl: null })

  onOpenReports = (event) => this.setState({ reportsEl: event.currentTarget })

  onCloseReports = () => this.setState({ reportsEl: null })

  render = () => (
    <div className={this.props.classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        {(this.props.width === 'lg' || this.props.width === 'xl') && (
          <Grid container justify="center">
            <Grid item lg={8}>
              {this.renderDesktop()}
            </Grid>
          </Grid>
        )}
        {this.props.width === 'md' && this.renderDesktop()}
        {(this.props.width === 'sm' || this.props.width === 'xs') && this.renderMobile()}
      </AppBar>
    </div>
  )

  renderDesktop = () => (
    <Toolbar>
      <img alt="" className={this.props.classes.logo} src={require('../assets/images/gotlancer-logo.png')} />
      <MenuButton color="inherit" onClick={this.onOpenProjects}>Projects</MenuButton>
      <Menu
        id="projects-menu"
        anchorEl={this.state.projectsEl}
        keepMounted
        open={!!this.state.projectsEl}
        onClose={this.onCloseProjects}
        getContentAnchorEl={null} // menu should be display below anchor
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // menu should be display below anchor
      >
        <MenuItem className={this.props.classes.label}>Find Work</MenuItem>
        <MenuItem className={this.props.classes.label}>Saved Jobs</MenuItem>
        <MenuItem className={this.props.classes.label}>Proposals</MenuItem>
        <MenuItem className={this.props.classes.label}>My Stats</MenuItem>
        <MenuItem className={this.props.classes.label}>My Project</MenuItem>
      </Menu>
      <MenuButton color="inherit" onClick={this.onOpenHire}>Hire</MenuButton>
      <Menu
        id="hire-menu"
        anchorEl={this.state.hireEl}
        keepMounted
        open={!!this.state.hireEl}
        onClose={this.onCloseHire}
        getContentAnchorEl={null} // menu should be display below anchor
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // menu should be display below anchor
      >
        <MenuItem className={this.props.classes.label}>Find Freelancer</MenuItem>
        <MenuItem className={this.props.classes.label}>Saved Freelancer</MenuItem>
        <MenuItem className={this.props.classes.label}>Hired Freelancer</MenuItem>
      </Menu>
      <MenuButton color="inherit" onClick={this.onOpenReports}>Reports</MenuButton>
      <Menu
        id="reports-menu"
        anchorEl={this.state.reportsEl}
        keepMounted
        open={!!this.state.reportsEl}
        onClose={this.onCloseReports}
        getContentAnchorEl={null} // menu should be display below anchor
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // menu should be display below anchor
      >
        <MenuItem className={this.props.classes.label}>Overview</MenuItem>
        <MenuItem className={this.props.classes.label}>My Reports</MenuItem>
        <MenuItem className={this.props.classes.label}>Proposal History</MenuItem>
        <MenuItem className={this.props.classes.label}>Transaction History</MenuItem>
        <MenuItem className={this.props.classes.label}>Payment History</MenuItem>
        <MenuItem className={this.props.classes.label}>Withdrawal History</MenuItem>
        <MenuItem className={this.props.classes.label}>Dispute List</MenuItem>
      </Menu>
      <SearchBox />
      <div style={{ flex: 1 }} />
      <Badge badgeContent={100} classes={{ badge: this.props.classes.badge }}>
        <IconButton color="inherit">
          <FontAwesomeIcon icon={faEnvelope} color={this.props.theme.palette.text.secondary} size="1x" />
        </IconButton>
      </Badge>
      <Badge badgeContent={5} classes={{ badge: this.props.classes.badge }}>
        <IconButton color="inherit">
          <FontAwesomeIcon icon={faBell} color={this.props.theme.palette.text.secondary} size="1x" />
        </IconButton>
      </Badge>
      <AvatarMenuButton />
    </Toolbar>
  )

  renderMobile = () => (
    <Toolbar>
      <img alt="" className={this.props.classes.logo} src={require('../assets/images/gotlancer-logo.png')} />
      <div style={{ flex: 1 }} />
      <Badge badgeContent={100} classes={{ badge: this.props.classes.badge }}>
        <IconButton color="inherit">
          <FontAwesomeIcon icon={faEnvelope} color={this.props.theme.palette.text.secondary} size="1x" />
        </IconButton>
      </Badge>
      <Badge badgeContent={5} classes={{ badge: this.props.classes.badge }}>
        <IconButton color="inherit">
          <FontAwesomeIcon icon={faBell} color={this.props.theme.palette.text.secondary} size="1x" />
        </IconButton>
      </Badge>
      <AvatarMenuIcon />
    </Toolbar>
  )
}

export default compose(
  withWidth(),
  withStyles(styles),
  withTheme
)(Header);