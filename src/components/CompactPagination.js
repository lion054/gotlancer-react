import React, { PureComponent } from 'react';
import { Box, withStyles, withWidth } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { compose } from 'redux';

const styles = (theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  }
});

class CompactPagination extends PureComponent {
  getSize() {
    switch (this.props.width) {
      case 'sm':
      case 'xs':
        return 'small';
      case 'md':
        return 'medium';
      default:
        return 'large';
    }
  }

  render = () => (
    <Box className={this.props.classes.root}>
      <Pagination count={10} size={this.getSize()} />
    </Box>
  )
}

export default compose(
  withStyles(styles),
  withWidth()
)(CompactPagination);