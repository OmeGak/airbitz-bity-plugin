import React, { Component, PropTypes } from 'react';

import styles from './cancel-ui.less';

const propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default class CancelOrderUi extends Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);

    this.state = {
      showConfirmation: false
    };

    this.showConfirmation = this.showConfirmation.bind(this);
    this.hideConfirmation = this.hideConfirmation.bind(this);
    this.onSubmitBtn = this.onSubmitBtn.bind(this);
  }

  onSubmitBtn() {
    this.props.onSubmit();
  }

  showConfirmation() {
    this.setState({
      showConfirmation: true
    });
  }

  hideConfirmation() {
    this.setState({
      showConfirmation: false
    });
  }

  render() {
    let content;

    if (this.state.showConfirmation) {
      content = (
        <div>
          <span className={styles.confirmationLabel}>Are you sure?</span>
          <div className={styles.confirmationButtons}>
            <button className="btn btn-primary" onClick={this.hideConfirmation}>No</button>
            <button className="btn btn-success" onClick={this.onSubmitBtn}>Yes</button>
          </div>
        </div>
      );
    } else {
      content = (
        <button className={`btn btn-primary ${styles.cancelBtn}`} onClick={this.showConfirmation}>Cancel</button>
      );
    }

    return (
      <div className={styles.root}>{content}</div>
    );
  }
}
