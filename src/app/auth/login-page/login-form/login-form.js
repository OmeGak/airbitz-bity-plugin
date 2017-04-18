import React, { Component, PropTypes } from 'react';
import { LocalForm, Field } from 'react-redux-form';
import classNames from 'classnames';
import { isNotEmptyString } from '../../../lib/validators';
import formStyles from '../../lib/form/styles.less';
import Spinner from '../../../lib/spinner';
import styles from './styles.less';

const submitBtnClassName = classNames('btn btn-primary btn-block', formStyles.formBtn);

const formValidators = {
  user: {
    required: isNotEmptyString
  },
  password: {
    required: isNotEmptyString
  }
};

const initialState = {
  user: '',
  password: ''
};

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isRequestStarted: PropTypes.bool.isRequired
};

export default class LoginForm extends Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);

    this.onUpdate = this.onUpdate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      valid: false
    };
  }

  onUpdate(formValue) {
    this.setState({
      valid: formValue.$form.valid
    });
  }

  onSubmit(data) {
    this.props.onSubmit(data);
  }

  render() {
    const { valid } = this.state;
    const { isRequestStarted } = this.props;

    const disableSubmitBtn = !valid || isRequestStarted;

    const loginBtnContent = isRequestStarted ?
      (
        <span className={styles.loading}>
          <Spinner type="inline" />
          <span>connecting...</span>
        </span>
      ) :
      (
        <span>login</span>
      );

    return (
      <LocalForm
        noValidate
        initialState={{ ...initialState }}
        validators={formValidators}
        onSubmit={this.onSubmit}
        onUpdate={this.onUpdate}
      >
        <div className="form-group">
          <Field model=".user">
            <input id="user" type="text" className="form-control" placeholder="Username, email or phone"
              autoCorrect="off" autoCapitalize="none" />
          </Field>
        </div>
        <div className="form-group">
          <Field model=".password">
            <input id="password" type="password" className="form-control" placeholder="Password" />
          </Field>
        </div>
        <div>
          <button type="submit" className={submitBtnClassName} disabled={disableSubmitBtn}>
            {loginBtnContent}
          </button>
        </div>
      </LocalForm>
    );
  }
}
