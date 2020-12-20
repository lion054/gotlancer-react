import React, { PureComponent } from 'react';
import { Button, withStyles, withTheme } from '@material-ui/core';
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import { compose } from 'redux';

const styles = (theme) => ({
  root: {
    position: 'relative'
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: theme.spacing(-1.5),
    marginLeft: theme.spacing(-1.5)
  }
});

class LoadingButton extends PureComponent {
  render = () => {
    const { loading, className, disabled, classes, ...otherProps } = this.props;
    const override = css`
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -10px;
      margin-left: -30px;
    `;
    return (
      <Button
        {...otherProps}
        disabled={this.props.disabled || this.props.loading}
        className={classes.root + ' ' + className}
      >
        {this.props.title}
        <BeatLoader
          css={override}
          color={this.props.theme.palette.success.main}
          loading={this.props.loading}
        />
      </Button>
    );
  }
}

LoadingButton.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func
};

export default compose(
  withStyles(styles),
  withTheme
)(LoadingButton);