import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { Form, Field, Errors } from 'react-redux-form';
import { connect } from 'react-redux';
import formStyles from '../form/styles.less';
import ErrorMsg from '../form/error-msg';
import { isNotEmptyString, isValidEmail } from '../../../lib/validators';

const propTypes = {
  modelName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired
};

const required = isNotEmptyString;

const passwordsMatch = ({ password, confirmedPassword }) => password === confirmedPassword;

const formValidators = {
  '': {
    passwordsMatch
  },
  userName: {
    required
  },
  email: {
    required,
    email: isValidEmail
  },
  phone: {
    required
  },
  password: {
    required
  },
  confirmedPassword: {
    required
  }
};

function SignupForm({ modelName, onSubmit, valid }) {
  const submitBtnClassName = classNames('btn btn-primary', formStyles.formBtn);
  return (
    <Form noValidate model={modelName} onSubmit={onSubmit} validators={formValidators}>
      <h2>get started</h2>
      <div className="form-group">
        <label htmlFor="username">username</label>
        <Field model=".userName">
          <input id="username" type="text" className="form-control" />
        </Field>
        <Errors
          model=".userName"
          messages={{
            required: 'Please provide an username'
          }}
          show={{ touched: true, focus: false }}
          component={ErrorMsg}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">email</label>
        <Field model=".email">
          <input id="email" type="email" className="form-control" />
        </Field>
        <Errors
          model=".email"
          messages={{
            required: 'Please provide an email',
            email: 'Invalid email value'
          }}
          show={{ touched: true, focus: false }}
          component={ErrorMsg}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">phone</label>
        <Field model=".phone">
          <input id="phone" type="tel" className="form-control" />
        </Field>
        <Errors
          model=".email"
          messages={{
            required: 'Please provide your phone number'
          }}
          show={{ touched: true, focus: false }}
          component={ErrorMsg}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">password</label>
        <Field model=".password">
          <input id="password" type="password" className="form-control" />
        </Field>
        <Errors
          model=".password"
          messages={{
            required: 'Please provide password'
          }}
          show={{ touched: true, focus: false }}
          component={ErrorMsg}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmed-password">confirm password</label>
        <Field model=".confirmedPassword">
          <input id="confirmed-password" type="password" className="form-control" />
        </Field>
        <Errors
          model={modelName}
          messages={{
            passwordsMatch: 'Passwords does not match'
          }}
          show={{ touched: true, focus: false }}
          component={ErrorMsg}
        />
      </div>
      <div>
        <button type="submit" className={submitBtnClassName} disabled={!valid}>signup</button>
        <Link className={formStyles.formBtn} to="/login">login</Link>
      </div>
    </Form>
  );
}

SignupForm.propTypes = propTypes;

const mapStateToProps = (state) => {
  const formState = state.forms.signupForm.$form;
  return {
    valid: formState.valid
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
