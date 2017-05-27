import React from 'react';
import Link from '../../lib/link';
import LoginForm from './login-form';
import { Card, CardHeader, CardBody, CardFooter } from '../../lib/card';
import AboutUsLink from '../../lib/about-us-link';

export default function LoggedOutUserView() {
  return (
    <Card>
      <CardHeader>Welcome!</CardHeader>
      <CardBody>
        <LoginForm />
      </CardBody>
      <CardFooter>
        <Link to="/signup" replace>Register here!</Link>
        <AboutUsLink />
      </CardFooter>
    </Card>
  );
}
