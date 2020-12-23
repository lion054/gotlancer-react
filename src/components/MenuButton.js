import React, { PureComponent } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    fontSize: theme.spacing(1.75),
    fontWeight: 600
  }
});

class MenuButton extends PureComponent {
  render = () => {
    const { textColor, ...rest } = this.props;
    return (
      <Button
        {...rest}
        style={{ color: textColor }}
      />
    );
  }
}

export default withStyles(styles)(MenuButton);