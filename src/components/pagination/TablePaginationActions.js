import React, { PureComponent } from 'react';
import { IconButton, withStyles, withTheme } from '@material-ui/core';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { compose } from 'redux';

const styles = (theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      marginLeft: 20
    },
    [theme.breakpoints.only('xs')]: {
      width: '100%'
    }
  }
});

class TablePaginationActions extends PureComponent {
  handleFirst = (e) => this.props.onChangePage(e, 0)

  handleBack = (e) => this.props.onChangePage(e, this.props.page - 1)

  handleNext = (e) => this.props.onChangePage(e, this.props.page + 1)

  handleLast = (e) => this.props.onChangePage(e, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1))

  render = () => (
    <div className={this.props.classes.root}>
      <IconButton
        size="small"
        onClick={this.handleFirst}
        disabled={this.props.page === 0}
        aria-label="first page"
      >
        {this.props.theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        size="small"
        onClick={this.handleBack}
        disabled={this.props.page === 0}
        aria-label="previous page"
      >
        {this.props.theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        size="small"
        onClick={this.handleNext}
        disabled={this.props.page >= Math.ceil(this.props.count / this.props.rowsPerPage) - 1}
        aria-label="next page"
      >
        {this.props.theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        size="small"
        onClick={this.handleLast}
        disabled={this.props.page >= Math.ceil(this.props.count / this.props.rowsPerPage) - 1}
        aria-label="last page"
      >
        {this.props.theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </div>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

export default compose(
  withStyles(styles),
  withTheme
)(TablePaginationActions);