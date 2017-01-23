import React from 'react';
import Page from '../lib/page';
import SignupForm from './lib/signup-form';

export default function SignupPage() {
  return (
    <Page>
      <SignupForm onSubmit={onSubmit} />
    </Page>
  );

  function onSubmit(data) {
    console.info('signup data', data); // eslint-disable-line no-console
  }
}
