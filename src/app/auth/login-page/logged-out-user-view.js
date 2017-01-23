import React from 'react';
import { Link } from 'react-router';
import LoginForm from './login-form';
import { Card, CardHeader, CardBody, CardFooter } from '../../lib/card';

export default function LoggedOutUserView() {
  return (
    <Card>
      <CardHeader>Welcome!</CardHeader>
      <CardBody>
        <LoginForm />
      </CardBody>
      <CardFooter>
        <Link to="/signup">Register here!</Link>
      </CardFooter>
    </Card>
  );
}
