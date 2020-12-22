import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Digit extends PureComponent {
  componentDidMount() {
    if (this.props.autoFocus && this.props.focus) {
      this.input.focus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.focus && this.props.focus) {
      this.input.focus();
    }
  }

  render = () => {
    const { focus, autoFocus, disabled, value, onInputFocus, index, secure, className, otpType, ...rest } = this.props;
    let inputType = 'text';
    if (secure) {
      inputType = 'password';
    } else if (otpType === 'number') {
      inputType = 'tel';
    }
    return (
      <input
        ref={c => this.input = c}
        disabled={disabled}
        maxLength="1"
        type={inputType}
        value={value || ''}
        className={className}
        style={{
          width: 32,
          height: 32,
          textAlign: 'center',
          marginRight: 20
        }}
        onFocus={e => onInputFocus(index, e)}
        {...rest}
      />
    );
  }
}

Digit.propTypes = {
  focus: PropTypes.bool,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  index: PropTypes.number,
  secure: PropTypes.bool,
  className: PropTypes.string,
  otpType: PropTypes.oneOf(['any', 'number', 'alpha', 'alphanumeric']),
  onInputFocus: PropTypes.func
}