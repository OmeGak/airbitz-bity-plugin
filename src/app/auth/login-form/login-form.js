import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Form, Field } from 'react-redux-form';
import formStyles from '../form/styles.less';
import { isNotEmptyString } from '../../lib/validators';

const propTypes = {
  modelName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired
};

const formValidators = {
  userName: {
    required: isNotEmptyString
  },
  password: {
    required: isNotEmptyString
  }
};

function LoginForm({ modelName, onSubmit, valid }) {
  const submitBtnClassName = classNames('btn btn-primary', formStyles.formBtn);

  return (
    <Form noValidate model={modelName} onSubmit={onSubmit} validators={formValidators}>
      <h2>welcome!</h2>
      <div className="form-group">
        <label htmlFor="username">username</label>
        <Field model=".userName">
          <input id="username" type="text" className="form-control" />
        </Field>
      </div>
      <div className="form-group">
        <label htmlFor="password">password</label>
        <Field model=".password">
          <input id="password" type="password" className="form-control" />
        </Field>
      </div>
      <div>
        <button type="submit" className={submitBtnClassName} disabled={!valid}>login</button>
        <Link className={formStyles.formBtn} to="/signup">signup</Link>
      </div>
    </Form>
  );
}

LoginForm.propTypes = propTypes;

const mapStateToProps = (state) => {
  const formState = state.forms.loginForm.$form;
  return {
    valid: formState.valid
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
