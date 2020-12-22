import React, { PureComponent } from 'react';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';

class OtpInput extends PureComponent {
  constructor(props) {
    super(props);
    const digits = [];
    this.inputs = [];
    for (let i = 0; i < props.numDigits; i++) {
      digits.push('');
      this.inputs.push(null);
    }
    this.state = {
      digits,
      activeIndex: -1
    };
  }

  render = () => (
    <div style={{
      width: this.props.width,
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      {this.state.digits.map((digit, index) => (
        <input
          key={index}
          ref={c => this.inputs[index] = c}
          maxLength="1"
          style={{
            width: '1em',
            ...this.props.inputStyle,
            '&:focus': this.props.focusStyle
          }}
          value={digit}
          onChange={e => {
            const digits = cloneDeep(this.state.digits);
            digits[index] = e.target.value;
            this.setState({ digits });
          }}
          onKeyDown={e => {
            if (e.key === 'Backspace') {}
          }}
        />
      ))}
    </div>
  )
}

OtpInput.propTypes = {
  width: PropTypes.number,
  numDigits: PropTypes.number,
  inputStyle: PropTypes.object,
  focusStyle: PropTypes.object,
  onComplete: PropTypes.func
}

export default OtpInput;