import React, { Fragment, PureComponent } from 'react';
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { updateThemeMode } from '../controllers/app/actions';
import InfoSwitch from '../components/InfoSwitch';

const styles = (theme) => ({
  menuList: {
    minWidth: theme.spacing(37.5)
  }
});

class AvatarMenuIcon extends PureComponent {
  state = {
    drawerOpened: false,
    currentDir: '',
    online: true
  }

  handleDrawer = () => this.setState({ drawerOpened: !this.state.drawerOpened })

  handleSubList = dir => {
    if (this.state.currentDir === dir) {
      this.setState({ currentDir: '' });
    } else {
      this.setState({ currentDir: dir });
    }
  }

  getDir = (parent, child) => !!parent ? (parent + '-' + child) : child.toString()

  renderListItems = (dir, items) => items.map((item, index) => (
    <div key={index}>
      <MenuItem onClick={() => {
        if (item.items) {
          this.handleSubList(this.getDir(dir, index));
        } else {
          if (item.onClick) {
            if (!item.onClick()) {
              return;
            }
          }
          this.handleDrawer();
        }
      }}>
        {item.element ? item.element() : (
          <ListItemText primary={item.label} primaryTypographyProps={{
            variant: 'body1',
            color: 'textPrimary'
          }} />
        )}
        {item.items && this.renderCollapseButton(this.getDir(dir, index))}
      </MenuItem>
      <Divider />
      {item.items && this.renderSubList(this.getDir(dir, index), item.items)}
    </div>
  ))

  renderCollapseButton = (dir) => (
    <ListItemSecondaryAction>
      <IconButton
        color="inherit"
        aria-label={this.state.currentDir === dir ? 'Close Submenu' : 'Open Submenu'}
        onClick={() => this.handleSubList(dir)}
      >
        <FontAwesomeIcon
          icon={this.state.currentDir === dir ? faChevronUp : faChevronDown}
          color={this.props.theme.palette.text.secondary}
          size="1x"
        />
      </IconButton>
    </ListItemSecondaryAction>
  )

  renderSubList = (dir, subList) => (
    <Collapse
      in={this.state.currentDir === dir}
      timeout="auto"
      unmountOnExit
      key={dir}
    >
      <MenuList>
        {this.renderListItems(dir, subList)}
      </MenuList>
    </Collapse>
  )

  render = () => (
    <Fragment>
      <IconButton color="inherit" onClick={this.handleDrawer}>
        <FontAwesomeIcon icon={faUserCircle} color={this.props.textColor} size="1x" />
      </IconButton>
      <Drawer
        anchor="right"
        open={this.state.drawerOpened}
        onClose={this.handleDrawer}
      >
        <MenuList classes={{ root: this.props.classes.menuList }}>
          {this.renderListItems('', [{
            element: () => (
              <Fragment>
                <Box mr={1.5}>
                  <FontAwesomeIcon icon={faUserCircle} color={this.props.theme.palette.text.secondary} size="2x" />
                </Box>
                <Box display="inline-block">
                  <Typography variant="body2" display="block" noWrap>Hi, Apurba</Typography>
                  <Typography variant="body2" display="block" color="textSecondary" noWrap>$100.00 USD</Typography>
                </Box>
                <div style={{ flex: 1 }} />
                <IconButton color="inherit" onClick={this.handleDrawer}>
                  <FontAwesomeIcon icon={faTimes} color={this.props.theme.palette.text.secondary} size="1x" />
                </IconButton>
              </Fragment>
            )
          },{
            label: 'Settings',
            onClick: () => {
              this.props.history.push('/account_settings');
            }
          },{
            label: 'My Profile'
          },{
            label: 'Membership'
          },{
            label: 'Buy Bid Credit'
          },{
            label: 'Projects',
            items: [{
              label: 'Find Work'
            },{
              label: 'Saved Jobs'
            },{
              label: 'Proposals'
            },{
              label: 'My Stats'
            },{
              label: 'My Project'
            }]
          },{
            label: 'Hire',
            items: [{
              label: 'Find Freelancer'
            },{
              label: 'Saved Freelancer'
            },{
              label: 'Hired Freelancer'
            }]
          },{
            label: 'Reports',
            items: [{
              label: 'Overview'
            },{
              label: 'My Reports'
            },{
              label: 'Proposal History'
            },{
              label: 'Transaction History'
            },{
              label: 'Payment History'
            },{
              label: 'Withdrawal History'
            },{
              label: 'Dispute List'
            }]
          },{
            label: 'Logout'
          // },{
          //   element: () => (
          //     <Fragment>
          //       <ListItemText primary="Dark Theme" primaryTypographyProps={{
          //         variant: 'body1',
          //         color: 'textPrimary'
          //       }} />
          //       <ListItemIcon>
          //         <InfoSwitch checked={this.props.themeMode === 'dark'} />
          //       </ListItemIcon>
          //     </Fragment>
          //   ),
          //   onClick: () => {
          //     if (this.props.themeMode === 'dark') {
          //       this.props.updateThemeMode('light');
          //     } else {
          //       this.props.updateThemeMode('dark');
          //     }
          //     return false;
          //   }
          },{
            element: () => (
              <Fragment>
                <ListItemText primary="Online" primaryTypographyProps={{
                  variant: 'body1',
                  color: 'textPrimary'
                }} />
                <ListItemIcon>
                  <InfoSwitch checked={this.state.online} />
                </ListItemIcon>
              </Fragment>
            ),
            onClick: () => {
              this.setState({ online : !this.state.online });
              return false;
            }
          }])}
        </MenuList>
      </Drawer>
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
)(AvatarMenuIcon);