import React, { PureComponent } from 'react';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Typography,
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    paddingRight: theme.spacing(8)
  },
  title: {
    color: theme.palette.text.primary,
    width: '100%'
  },
  subtitle: {
    color: theme.palette.text.secondary,
    width: '100%'
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
        <Switch color="primary" onChange={this.handleChange} />
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