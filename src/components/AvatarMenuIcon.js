import React, { Fragment, PureComponent } from 'react';
import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  MenuList,
  Switch,
  Typography,
  withStyles
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const styles = (theme) => ({
  avatarIcon: {
    color: theme.palette.text.disabled,
    fontSize: 32
  },
  menuList: {
    minWidth: 300
  },
  close: {
    color: '#314963',
    fontSize: 20
  },
  avatarWrapper: {
    marginRight: 12
  },
  label: {
    color: '#314963',
    fontSize: 14
  },
  collapse: {
    fontSize: 16
  }
});

const TitleTypography = withStyles({
  root: {
    color: '#314963',
    whiteSpace: 'nowrap'
  }
})(Typography);

const BalanceTypography = withStyles({
  root: {
    color: '#ADBDCD',
    whiteSpace: 'nowrap'
  }
})(Typography);

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
          <ListItemText classes={{ primary: this.props.classes.label }} primary={item.label} />
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
          color="#314963"
          className={this.props.classes.collapse}
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
        <FontAwesomeIcon icon={faUserCircle} className={this.props.classes.avatarIcon} />
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
                <div className={this.props.classes.avatarWrapper}>
                  <FontAwesomeIcon icon={faUserCircle} className={this.props.classes.avatarIcon} />
                </div>
                <div style={{ display: 'inline-block' }}>
                  <TitleTypography variant="body2" display="block">Hi, Apurba</TitleTypography>
                  <BalanceTypography variant="caption" display="block">$100.00 USD</BalanceTypography>
                </div>
                <div style={{ flex: 1 }} />
                <IconButton color="inherit" onClick={this.handleDrawer}>
                  <FontAwesomeIcon icon={faTimes} className={this.props.classes.close} />
                </IconButton>
              </Fragment>
            )
          },{
            label: 'Settings'
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
          },{
            element: () => (
              <Fragment>
                <ListItemText classes={{ primary: this.props.classes.label }} primary="Online" />
                <ListItemIcon>
                  <Switch checked={this.state.online} />
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

export default withStyles(styles)(AvatarMenuIcon);