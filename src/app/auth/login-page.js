import React from 'react';
import Page from '../lib/page';
import LoginForm from './login-form';

export default function LoginPage() {
  return (
    <Page>
      <LoginForm onSubmit={onSubmit} />
    </Page>
  );

  function onSubmit(data) {
    console.info('login data: ', data); // eslint-disable-line no-console
  }
}
