import React, { PureComponent } from 'react';
import { Box, TablePagination, withStyles, withWidth } from '@material-ui/core';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import EmptyPaginationActions from './EmptyPaginationActions';
import TablePaginationActions from './TablePaginationActions';

const styles = (theme) => ({
  root: {
    textAlign: 'right'
  }
});

class CustomTablePagination extends PureComponent {
  render = () => (
    <Box className={this.props.classes.root}>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={this.props.count}
        rowsPerPage={this.props.rowsPerPage}
        page={this.props.page}
        onChangePage={this.props.onChangePage}
        onChangeRowsPerPage={this.props.onChangeRowsPerPage}
        ActionsComponent={this.props.width === 'xs' ? EmptyPaginationActions : TablePaginationActions}
      />
      {this.props.width === 'xs' && (
        <TablePaginationActions
          count={this.props.count}
          onChangePage={this.props.onChangePage}
          page={this.props.page}
          rowsPerPage={this.props.rowsPerPage}
        />
      )}
    </Box>
  )
}

CustomTablePagination.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}

export default compose(
  withStyles(styles),
  withWidth()
)(CustomTablePagination);