import React, { Component, PropTypes } from 'react';
import { LocalForm, Field } from 'react-redux-form';
import { Card, CardHeader, CardBody } from '../../lib/card';
import ExternalLink from '../../lib/external-link';
import Spinner from '../../lib/spinner';
import Link from '../../lib/link';
import ErrorMsg from './error-msg';
import * as utils from './utils';
import AboutUsLink from '../../lib/about-us-link';

import styles from './signup-form.less';

const propTypes = {
  isSignupStarted: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const validators = {
  username: utils.usernameFieldValidatorFactory(),
  email: utils.emailFieldValidatorFactory(),
  password: utils.passwordFieldValidatorFactory()
};

export default class SignupForm extends Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);

    this.state = {
      formIsValid: false
    };

    this.onFormUpdate = this.onFormUpdate.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormUpdate({ $form }) {
    this.setState({
      formIsValid: $form.valid
    });
  }

  onFormSubmit({ username, password, email }) {
    this.props.onSubmit({
      username,
      password,
      email
    });
  }

  render() {
    const { isSignupStarted } = this.props;
    const { formIsValid } = this.state;
    const disableSubmitButton = !formIsValid || isSignupStarted;

    const signupBtnContent = isSignupStarted ?
      (
        <span className={styles.loading}>
          <Spinner type="inline" />
          <span>Sending data...</span>
        </span>
      ) :
      (
        <span>Register</span>
      );

    return (
      <Card>
        <CardHeader>
          <span>Get started</span>
        </CardHeader>
        <CardBody>
          {/* form */}
          <div>
            <LocalForm noValidate validators={validators} onUpdate={this.onFormUpdate} onSubmit={this.onFormSubmit}
              className={styles.root}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field model=".username">
                  <input id="username" type="text" className="form-control" placeholder="Username" />
                </Field>
                <ErrorMsg model=".username" messages={utils.usernameFieldErrorMessages()} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field model=".email">
                  <input id="email" type="email" className="form-control" placeholder="Email" />
                </Field>
                <ErrorMsg model=".email" messages={utils.emailFieldErrorMessages()} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field model=".password">
                  <input id="password" type="password" className="form-control" placeholder="Password" />
                </Field>
                <ErrorMsg model=".password" messages={utils.passwordFieldErrorMessages()} />
              </div>
              <div>
                <button type="submit" className="btn btn-primary btn-block" disabled={disableSubmitButton}>
                  {signupBtnContent}
                </button>
              </div>
            </LocalForm>
          </div>
          {/* /form */}

          {/* term and conditions */}
          <div className={styles.tos}>By registering, I agree to
            the <ExternalLink href="https://bity.com/legal">Terms and Conditions</ExternalLink> and
            I certify not to be domiciled in New York State (USA).
          </div>
          {/* / term and conditions */}

          {/* other options */}
          <div className={styles.otherOptions}>
            <span>Already have an account?&nbsp;</span>
            <span>
              <Link to="/login" replace>Login</Link>
            </span>
            <AboutUsLink />
          </div>
          {/* / other options */}
        </CardBody>
      </Card>
    );
  }
}
