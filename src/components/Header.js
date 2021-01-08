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

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  toolbar: {
    justifyContent: 'space-between',
    height: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(2)
    }
  },
  logoContainer: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1)
    }
  },
  logo: {
    width: 43
  },
  optional: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
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
      color: theme.palette.primary.main
    },
    fontSize: theme.spacing(1.75)
  }
});

const MenuButton = withStyles((theme) => ({
  root: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.text.primary
  }
}))(Button);

class Header extends PureComponent {
  state = {
    projectsEl: null,
    hireEl: null,
    financeEl: null,
    contestEl: null,
    marketsEl: null,
    drawerOpened: false
  }

  onOpenProjects = (event) => this.setState({ projectsEl: event.currentTarget })

  onCloseProjects = () => this.setState({ projectsEl: null })

  onOpenHire = (event) => this.setState({ hireEl: event.currentTarget })

  onCloseHire = () => this.setState({ hireEl: null })

  onOpenFinance = (event) => this.setState({ financeEl: event.currentTarget })

  onCloseFinance = () => this.setState({ financeEl: null })

  onOpenContest = (event) => this.setState({ contestEl: event.currentTarget })

  onCloseContest = () => this.setState({ contestEl: null })

  onOpenMarket = (event) => this.setState({ marketEl: event.currentTarget })

  onCloseMarket = () => this.setState({ marketEl: null })

  render = () => {
    console.log(this.props.width);
    return (
      <div style={{ flexGrow: 1, height: 64 }}>
        <AppBar position="fixed" color="transparent" elevation={1} className={this.props.classes.root}>
          <Grid container>
            <Grid item lg={2} />
            <Grid item lg={8} xs={12}>
              <Toolbar disableGutters className={this.props.classes.toolbar}>
                <Box display="flex" alignItems="center">
                  <IconButton className={this.props.classes.logoContainer} onClick={() => this.props.history.push('/')}>
                    <img alt="" className={this.props.classes.logo} src={require('../assets/images/gl-logo-black.svg')} />
                  </IconButton>
                  <Box className={this.props.classes.optional} ml={1}>
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
                      <MenuItem className={this.props.classes.label}>Bids</MenuItem>
                      <MenuItem className={this.props.classes.label}>My Stats</MenuItem>
                      <MenuItem className={this.props.classes.label} onClick={() => this.props.history.push('/projects')}>My Projects</MenuItem>
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
                    <MenuButton onClick={this.onOpenFinance}>Finance</MenuButton>
                    <Menu
                      id="finance-menu"
                      anchorEl={this.state.financeEl}
                      keepMounted
                      open={!!this.state.financeEl}
                      onClose={this.onCloseFinance}
                      getContentAnchorEl={null} // menu should be display below anchor
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // menu should be display below anchor
                    >
                      <MenuItem className={this.props.classes.label} onClick={() => this.props.history.push('/deposit_fund')}>Deposit Fund</MenuItem>
                      <MenuItem className={this.props.classes.label}>Balance Sheet</MenuItem>
                      <MenuItem className={this.props.classes.label}>Overview</MenuItem>
                      <MenuItem className={this.props.classes.label}>Bid History</MenuItem>
                      <MenuItem className={this.props.classes.label}>Transaction History</MenuItem>
                      <MenuItem className={this.props.classes.label} onClick={() => this.props.history.push('/payment_history')}>Payment History</MenuItem>
                      <MenuItem className={this.props.classes.label}>Withdrawal History</MenuItem>
                      <MenuItem className={this.props.classes.label} onClick={() => this.props.history.push('/disputation')}>Disputation</MenuItem>
                      <MenuItem className={this.props.classes.label} onClick={() => this.props.history.push('/withdraw_fund')}>Withdraw Fund</MenuItem>
                    </Menu>
                  </Box>
                  <Box className={this.props.classes.optional}>
                    <MenuButton onClick={this.onOpenContest}>Contest</MenuButton>
                    <Menu
                      id="contest-menu"
                      anchorEl={this.state.contestEl}
                      keepMounted
                      open={!!this.state.contestEl}
                      onClose={this.onCloseContest}
                      getContentAnchorEl={null} // menu should be display below anchor
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // menu should be display below anchor
                    >
                      <MenuItem className={this.props.classes.label}>Find Contest</MenuItem>
                      <MenuItem className={this.props.classes.label}>Saved Contest</MenuItem>
                    </Menu>
                  </Box>
                  <Box className={this.props.classes.optional}>
                    <MenuButton onClick={this.onOpenMarket}>Market</MenuButton>
                    <Menu
                      id="market-menu"
                      anchorEl={this.state.marketEl}
                      keepMounted
                      open={!!this.state.marketEl}
                      onClose={this.onCloseMarket}
                      getContentAnchorEl={null} // menu should be display below anchor
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // menu should be display below anchor
                    >
                      <MenuItem className={this.props.classes.label}>Explore Market</MenuItem>
                      <MenuItem className={this.props.classes.label}>Saved Market</MenuItem>
                    </Menu>
                  </Box>
                  <Box className={this.props.classes.optional}>
                    <Button variant="contained" style={{ marginLeft: 8, borderRadius: 18 }} onClick={() => this.props.history.push('/post_project')}>Post a project</Button>
                  </Box>
                </Box>
                <Box display="flex">
                  <Badge badgeContent={100} classes={{ badge: this.props.classes.badge }}>
                    <IconButton onClick={() => this.props.history.push('/messenger')}>
                      <FontAwesomeIcon icon={faEnvelope} size="1x" />
                    </IconButton>
                  </Badge>
                  <Badge badgeContent={5} classes={{ badge: this.props.classes.badge }}>
                    <IconButton onClick={() => this.props.history.push('/notifications')}>
                      <FontAwesomeIcon icon={faBell} size="1x" />
                    </IconButton>
                  </Badge>
                  {this.props.width === 'xs' ? (
                    <AvatarMenuIcon />
                  ) : (
                    <AvatarMenuButton />
                  )}
                </Box>
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