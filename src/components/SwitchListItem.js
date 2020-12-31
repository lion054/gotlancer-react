import React, { PureComponent } from 'react';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';

import BlueSwitch from './BlueSwitch';

const styles = (theme) => ({
  root: {
    paddingRight: theme.spacing(8)
  },
  action: {
    paddingLeft: theme.spacing(1)
  }
});

class SwitchListItem extends PureComponent {
  handleChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  render = () => (
    <ListItem divider className={this.props.classes.root}>
      <ListItemText>
        <Typography variant="subtitle1">{this.props.title}</Typography>
        {!!this.props.subtitle && (
          <Typography variant="body2">{this.props.subtitle}</Typography>
        )}
      </ListItemText>
      <ListItemSecondaryAction classes={{ root: this.props.classes.action }}>
        <BlueSwitch color="primary" onChange={this.handleChange} />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

SwitchListItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onChange: PropTypes.func
}

export default withStyles(styles)(SwitchListItem);