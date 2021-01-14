import React, { PureComponent } from 'react';
import { Avatar, Chip, IconButton, Tooltip, withStyles, withTheme } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { compose } from 'redux';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(-0.5),
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },
  plus: {
    border: `solid 1px ${theme.palette.action.disabled}`,
    padding: theme.spacing(0.5)
  }
});

class ChipContainer extends PureComponent {
  handleDelete(index) {
    if (this.props.readOnly) {
      return;
    }
  }

  render = () => (
    <div className={this.props.classes.root}>
      {this.props.chips.map(({ title, backgroundColor, color }, index) => this.props.readOnly ? (
        <Chip
          key={index}
          label={title}
          style={{ backgroundColor, color }}
        />
      ) : (
        <Chip
          key={index}
          label={title}
          deleteIcon={!this.props.readOnly ? (
            <Avatar style={{ border: `solid 1px ${this.props.theme.palette.action.disabled}` }}>
              <Close />
            </Avatar>
          ) : null}
          onDelete={() => this.handleDelete(index)}
          style={{ backgroundColor, color }}
        />
      ))}
      {!this.props.readOnly && (
        <Tooltip title={this.props.buttonTitle}>
          <IconButton className={this.props.classes.plus}>
            <Add htmlColor={this.props.theme.palette.success.main} />
          </IconButton>
        </Tooltip>
      )}
    </div>
  )
}

ChipContainer.propTypes = {
  chips: PropTypes.array,
  readOnly: PropTypes.bool,
  buttonTitle: PropTypes.string
};

export default compose(
  withStyles(styles),
  withTheme
)(ChipContainer);