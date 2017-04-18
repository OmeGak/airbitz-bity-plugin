import React, { Component } from 'react';
import Header from './header';

const DEBOUNCE_DELAY = 100;

// magic value. It is paddingTop of the .page (15px) - 5px
const SCROLL_THRESHOLD = 10;

export default class InvertibleHeader extends Component {
  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
    this.debounceTimeoutId = NaN;

    this.state = {
      inverted: isInverted()
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    this.clearDebounce();
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    if (this.hasDebounce()) {
      return;
    }
    this.startDebounce();
  }

  handleScroll() {
    const nextValue = isInverted();
    if (this.state === nextValue) {
      return;
    }
    this.setState({
      inverted: nextValue
    });
  }

  hasDebounce() {
    return !isNaN(this.debounceTimeoutId);
  }

  startDebounce() {
    this.debounceTimeoutId = setTimeout(() => {
      this.clearDebounce();
      this.handleScroll();
    }, DEBOUNCE_DELAY);
  }

  clearDebounce() {
    if (!this.hasDebounce()) {
      return;
    }
    clearTimeout(this.debounceTimeoutId);
    this.debounceTimeoutId = NaN;
  }

  render() {
    const { inverted } = this.state;
    return <Header inverted={inverted} {...this.props} />;
  }
}

function isInverted() {
  return window.pageYOffset > SCROLL_THRESHOLD;
}
