import React, { PureComponent } from 'react';
import {
  AppBar,
  Badge,
  Box,
  Button,
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
import SearchBox from './SearchBox';
import { getHeaderHoverBackgroundColor } from '../themes';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.type === 'dark' ? '#fafafa' : '#24292e'
  },
  logo: {
    width: theme.spacing(5)
  },
  optional: {
    [theme.breakpoints.only('xs')]: {
      display: 'none'
    }
  },
  search: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
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

const MenuButton = withStyles((theme) => ({
  root: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300],
    '&:hover': {
      backgroundColor: getHeaderHoverBackgroundColor(theme)
    }
  }
}))(Button);

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
    console.log(this.props.width);
    return (
      <div style={{ flexGrow: 1, height: 64 }}>
        <AppBar position="fixed" color="transparent" elevation={1} className={this.props.classes.root}>
          <Grid container>
            <Grid item lg={2} />
            <Grid item lg={8} xs={12}>
              <Toolbar disableGutters style={{ height: 64 }}>
                <MenuItem onClick={() => this.props.history.push('/')} style={{ minWidth: this.props.theme.spacing(9) }}>
                  <img alt="" className={this.props.classes.logo} src={require('../assets/images/gotlancer-logo-short.svg')} />
                </MenuItem>
                <Box className={this.props.classes.optional} ml={3}>
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
                    <MenuItem className={this.props.classes.label} onClick={() => this.props.history.push('/find_work')}>Find Work</MenuItem>
                    <MenuItem className={this.props.classes.label}>Saved Jobs</MenuItem>
                    <MenuItem className={this.props.classes.label}>Proposals</MenuItem>
                    <MenuItem className={this.props.classes.label}>My Stats</MenuItem>
                    <MenuItem className={this.props.classes.label}>My Project</MenuItem>
                  </Menu>
                </Box>
                <Box className={this.props.classes.optional}>
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
                </Box>
                <Box className={this.props.classes.optional}>
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
                </Box>
                <Box className={this.props.classes.search}>
                  <SearchBox textColor={textColor} />
                </Box>
                <div style={{ flex: 1 }} />
                <Badge badgeContent={100} classes={{ badge: this.props.classes.badge }}>
                  <IconButton className={this.props.classes.icon} onClick={() => this.props.history.push('/messenger')}>
                    <FontAwesomeIcon icon={faEnvelope} color={textColor} size="1x" />
                  </IconButton>
                </Badge>
                <Badge badgeContent={5} classes={{ badge: this.props.classes.badge }}>
                  <IconButton className={this.props.classes.icon}>
                    <FontAwesomeIcon icon={faBell} color={textColor} size="1x" />
                  </IconButton>
                </Badge>
                {this.props.width === 'xs' ? (
                  <AvatarMenuIcon textColor={textColor} />
                ) : (
                  <AvatarMenuButton textColor={textColor} />
                )}
              </Toolbar>
            </Grid>
            <Grid item lg={2} />
          </Grid>
        </AppBar>
      </div>
    );
  }
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