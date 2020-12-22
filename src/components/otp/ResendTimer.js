import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ResendTimer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      remainingTime: props.maxTime
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.state.remainingTime > 0) {
        this.setState({ remainingTime: this.state.remainingTime - 1 });
      } else {
        clearInterval(this.timer);
        if (this.props.onTimerComplete) {
          this.props.onTimerComplete();
        }
      }
    }, this.props.timeInterval);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  handleResendClick = () => {
    if (this.props.onResendClick) {
      this.props.onResendClick();
    }
    this.setState({ remainingTime: this.props.maxTime });
  }

  render = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      ...this.props.style
    }}>
      {this.props.renderTime ? this.props.renderTime(this.state.remainingTime) : (
        <span>{this.state.remainingTime} sec</span>
      )}
      {this.props.renderButton ? this.props.renderButton({
        disabled: this.state.remainingTime !== 0,
        onClick: this.handleResendClick,
        remainingTime: this.state.remainingTime
      }) : (
        <button disabled={this.state.remainingTime !== 0} onClick={this.handleResendClick}>Resend OTP</button>
      )}
    </div>
  )
}

ResendTimer.propTypes = {
  onTimerComplete: PropTypes.func,
  onResendClick: PropTypes.func,
  renderTime: PropTypes.func,
  renderButton: PropTypes.func,
  maxTime: PropTypes.number,
  timeInterval: PropTypes.number,
  style: PropTypes.object
}

ResendTimer.defaultProps = {
  maxTime: 60,
  timeInterval: 1000,
  style: {}
}