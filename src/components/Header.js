import React, { PureComponent } from 'react';
import {
  AppBar,
  Badge,
  Box,
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
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import AvatarMenuButton from './AvatarMenuButton';
import AvatarMenuIcon from './AvatarMenuIcon';
import MenuButton from './MenuButton';
import SearchBox from './SearchBox';
import { getHeaderHoverBackgroundColor } from '../themes';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.type === 'dark' ? '#fafafa' : '#24292e'
  },
  logo: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  icon: {
    '&:hover': {
      backgroundColor: getHeaderHoverBackgroundColor(theme)
    }
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
      color: theme.palette.info.main
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

  render = () => {
    const textColor = this.props.theme.palette.theme === 'dark' ? this.props.theme.palette.grey[700] : this.props.theme.palette.grey[300];
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static" color="transparent" elevation={1}>
          {(this.props.width === 'lg' || this.props.width === 'xl') && (
            <Grid container>
              <Grid item lg={2} />
              <Grid item lg={8}>
                {this.renderDesktop(textColor)}
              </Grid>
              <Grid item lg={2} />
            </Grid>
          )}
          {this.props.width === 'md' && this.renderDesktop(textColor)}
          {(this.props.width === 'sm' || this.props.width === 'xs') && this.renderMobile(textColor)}
        </AppBar>
      </div>
    );
  }

  renderDesktop = (textColor) => (
    <Toolbar>
      <Box mr={3}>
        <MenuItem onClick={() => this.props.history.push('/')}>
          <img alt="" className={this.props.classes.logo} src={require('../assets/images/gotlancer-logo-short.svg')} />
        </MenuItem>
      </Box>
      <MenuButton onClick={this.onOpenProjects}>Projects</MenuButton>
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
      <MenuButton onClick={this.onOpenHire}>Hire</MenuButton>
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
      <MenuButton onClick={this.onOpenReports}>Reports</MenuButton>
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
      <SearchBox textColor={textColor} />
      <div style={{ flex: 1 }} />
      <Badge badgeContent={100} classes={{ badge: this.props.classes.badge }}>
        <IconButton className={this.props.classes.icon}>
          <FontAwesomeIcon icon={faEnvelope} color={textColor} size="1x" />
        </IconButton>
      </Badge>
      <Badge badgeContent={5} classes={{ badge: this.props.classes.badge }}>
        <IconButton className={this.props.classes.icon}>
          <FontAwesomeIcon icon={faBell} color={textColor} size="1x" />
        </IconButton>
      </Badge>
      <AvatarMenuButton textColor={textColor} />
    </Toolbar>
  )

  renderMobile = (textColor) => (
    <Toolbar>
      <MenuItem onClick={() => this.props.history.push('/')}>
        <img alt="" className={this.props.classes.logo} src={require('../assets/images/gotlancer-logo-short.svg')} />
      </MenuItem>
      <div style={{ flex: 1 }} />
      <Badge badgeContent={100} classes={{ badge: this.props.classes.badge }}>
        <IconButton className={this.props.classes.icon}>
          <FontAwesomeIcon icon={faEnvelope} color={textColor} size="1x" />
        </IconButton>
      </Badge>
      <Badge badgeContent={5} classes={{ badge: this.props.classes.badge }}>
        <IconButton className={this.props.classes.icon}>
          <FontAwesomeIcon icon={faBell} color={textColor} size="1x" />
        </IconButton>
      </Badge>
      <AvatarMenuIcon textColor={textColor} />
    </Toolbar>
  )
}

const mapStateToProps = ({
  app: { themeMode }
}) => ({
  themeMode
});

export default compose(
  withRouter,
  withWidth(),
  withStyles(styles),
  withTheme,
  connect(mapStateToProps)
)(Header);