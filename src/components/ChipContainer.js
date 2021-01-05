import React, { PureComponent } from 'react';
import { Chip, withStyles, withTheme } from '@material-ui/core';
import PropTypes from 'prop-types';
import { compose } from 'redux';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  }
});

class ChipContainer extends PureComponent {
  render = () => (
    <div className={this.props.classes.root}>
      {this.props.chips.map(({ title, backgroundColor, color }, index) => (
        <Chip
          key={index}
          label={title}
          style={{ backgroundColor, color }}
        />
      ))}
    </div>
  )
}

ChipContainer.propTypes = {
  chips: PropTypes.array
};

export default compose(
  withStyles(styles),
  withTheme
)(ChipContainer);