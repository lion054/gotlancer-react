import React, { Children, PureComponent } from 'react';
import { Select, Typography, withStyles } from '@material-ui/core';

const PlaceholderItem = withStyles((theme) => ({
  root: {
    color: theme.palette.text.disabled
  }
}))(Typography);

export default class PlaceholderSelect extends PureComponent {
  render = () => {
    const { children, placeholder, ...rest } = this.props;
    return (
      <Select
        {...rest}
        displayEmpty
        renderValue={!!this.props.value ? undefined : this.renderPlaceholder}
      >
        {Children.toArray(children)}
      </Select>
    );
  }

  renderPlaceholder = () => (
    <PlaceholderItem>{this.props.placeholder}</PlaceholderItem>
  )
}