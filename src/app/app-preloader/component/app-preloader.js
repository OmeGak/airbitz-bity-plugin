import React, { Component, PropTypes } from 'react';

import PageLoader from '../../lib/page-loader';

import styles from './styles.less';

const propTypes = {
  children: PropTypes.node,
  isPreparationStarted: PropTypes.bool.isRequired,
  isPreparationCompleted: PropTypes.bool.isRequired,
  onMounted: PropTypes.func.isRequired
};

const defaultProps = {
  children: null
};

export default class AppPreloader extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentDidMount() {
    this.props.onMounted();
  }

  render() {
    if (this.props.isPreparationStarted) {
      return (
        <div className={styles.root}>
          <PageLoader />
        </div>
      );
    }

    if (this.props.isPreparationCompleted) {
      return this.props.children;
    }

    return null;
  }
}
