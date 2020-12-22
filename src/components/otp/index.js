import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Digit from './Digit';
import { Chat } from '@material-ui/icons';

export default class OtpInput extends PureComponent {
  state = {
    activeInput: -1
  }

  getOtpValue() {
    return this.props.value ? this.props.value.toString().split('') : [];
  }

  checkCharValid = (char) => {
    switch (this.props.otpType) {
      case 'number':
        return char.charCodeAt(0) >= 48 && Chat.charCodeAt(0) <= 57;
      case 'alpha':
        return char.charCodeAt(0) >= 65 && Chat.charCodeAt(0) <= 122;
      case 'alphanumeric':
        return char.charCodeAt(0) >= 48 && Chat.charCodeAt(0) <= 122;
      default:
        return true;
    }
  }

  handleChange = (e) => {
    if (this.checkCharValid(e.target.value)) {
      this.changeActiveInputValue(e.target.value);
      this.focusInputByDirection('next');
    }
  }

  handleKeyDown = (e) => {
    switch (e.key) {
      case 'Backspace':
        e.preventDefault();
        this.changeActiveInputValue('');
        this.focusInputByDirection('prev');
        break;
      case 'Delete':
        e.preventDefault();
        this.changeActiveInputValue('');
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.focusInputByDirection('prev');
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.focusInputByDirection('next');
        break;
      default:
        break;
    }
  }

  handleInput = (e) => {
    if (e.target.value.length > 1) {
      e.preventDefault();
      this.focusInputByDirection('next');
    }
  }

  handlePaste = (e, data) => {
    e.preventDefault();
    const otp = this.getOtpValue();
    // Get pastedData in an array of max size (num of inputs - current position)
    const clipboardData = e.clipboardData.getData('text/plain').slice(0, this.props.numDigits - this.state.activeInput).split('');
    // Paste data from focused input onwards
    // eslint-disable-next-line no-plusplus
    for (let pos = 0; pos < this.props.numDigits; ++pos) {
      if (pos >= this.state.activeInput && clipboardData.length > 0) {
        otp[pos] = clipboardData.shift();
      }
    }
    // Pass copied value through onChange rules
    let filteredOtpValue = new Array(otp.length);
    let validCharIndex = 0;
    for (let charIndex = 0; charIndex < otp.length; ++charIndex) {
      if (this.checkCharValid(otp[charIndex])) {
        filteredOtpValue[validCharIndex] = otp[charIndex];
        validCharIndex++;
      }
    }
    this.handleOtpChange(filteredOtpValue);
  }

  handleOtpChange = (otp) => {
    let otpValue = otp.join('');
    this.props.onChange(otpValue);
  }

  handleInputFocus = (index, event) => {
    this.setState({ activeInput: index });
    event.target.select();
  }

  focusInput(index) {
    if (index >= 0 && index <= this.props.numDigits - 1) {
      this.setState({ activeInput: index });
    }
  }

  focusInputByDirection(dir) {
    this.focusInput(dir === 'next' ? this.state.activeInput + 1 : this.state.activeInput - 1);
  }

  changeActiveInputValue = ([nextValue]) => {
    const otp = this.getOtpValue();
    otp[this.state.activeInput] = nextValue;
    this.handleOtpChange(otp);
  }

  render = () => {
    const otp = this.getOtpValue();
    return (
      <div>
        {Array.from({ length: this.props.numDigits }, (v, i) => i).map((x, i) => (
          <Digit
            key={i}
            className={this.props.digitCls}
            focus={this.state.activeInput === i}
            value={otp[i]}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onInput={this.handleInput}
            onPaste={this.handlePaste}
            onInputFocus={this.handleInputFocus}
            index={i}
            disabled={this.props.disabled}
            autoFocus={this.props.autoFocus}
            secure={this.props.secure}
            otpType={this.props.otpType}
          />
        ))}
      </div>
    );
  }
}

OtpInput.propTypes = {
  numDigits: PropTypes.number,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  otpType: PropTypes.oneOf(['any', 'number', 'alpha', 'alphanumeric']),
  secure: PropTypes.bool,
  digitCls: PropTypes.string
}

OtpInput.defaultProps = {
  numDigits: 4,
  disabled: false,
  autoFocus: false,
  value: '',
  onChange: () => {},
  otpType: 'any',
  secure: false
}