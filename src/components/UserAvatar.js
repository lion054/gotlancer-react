import React, { PureComponent } from 'react';
import { Box, colors, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const withStylesProps = (styles) => (Component) => (props) => {
  const ExtendedComponent = withStyles((theme) => styles({ ...props, theme }))(Component);
  return <ExtendedComponent {...props} />;
};

const statusMinSize = 12;

const styles = ({ theme, size, sizeSM, marginRight, marginRightSM, online }) => ({
  root: {
    marginRight,
    [theme.breakpoints.down('sm')]: {
      marginRight: marginRightSM
    }
  },
  image: {
    width: size,
    height: size,
    borderRadius: size * 0.5,
    [theme.breakpoints.down('sm')]: {
      width: sizeSM,
      height: sizeSM,
      borderRadius: sizeSM * 0.5
    }
  },
  status: {
    boxSizing: 'border-box',
    backgroundColor: online ? theme.palette.success.main : colors.grey[400],
    border: `solid 2px ${theme.palette.common.white}`,
    position: 'absolute',
    width: Math.max(size * 0.25, statusMinSize),
    height: Math.max(size * 0.25, statusMinSize),
    borderRadius: Math.max(size * 0.125, statusMinSize * 0.5),
    top: size - Math.max(size * 0.25, statusMinSize),
    left: size - Math.max(size * 0.25, statusMinSize),
    [theme.breakpoints.down('sm')]: {
      width: Math.max(sizeSM * 0.25, statusMinSize),
      height: Math.max(sizeSM * 0.25, statusMinSize),
      borderRadius: Math.max(sizeSM * 0.125, statusMinSize * 0.5),
      top: sizeSM - Math.max(sizeSM * 0.25, statusMinSize),
      left: sizeSM - Math.max(sizeSM * 0.25, statusMinSize)
    }
  }
});

class UserAvatar extends PureComponent {
  render = () => (
    <Box position="relative" className={this.props.classes.root} style={this.props.style ? this.props.style : {}}>
      <img alt="" src={this.props.url} className={this.props.classes.image} />
      <Box className={this.props.classes.status} />
    </Box>
  )
}

UserAvatar.propTypes = {
  style: PropTypes.object,
  url: PropTypes.string,
  online: PropTypes.bool,
  size: PropTypes.number,
  sizeSM: PropTypes.number,
  marginRight: PropTypes.number,
  marginRightSM: PropTypes.number
}

export default withStylesProps(styles)(UserAvatar);