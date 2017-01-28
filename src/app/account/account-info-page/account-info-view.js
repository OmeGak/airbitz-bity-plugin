import React, { PropTypes } from 'react';
import { Card, CardHeader, CardBody } from '../../lib/card';

const propTypes = {
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired
  }).isRequired
};

export default function AccountInfoView({ data }) {
  const { email, userName } = data;
  return (
    <Card>
      <CardHeader>My info</CardHeader>
      <CardBody>
        <table>
          <tbody>
            <tr>
              <td><strong>Username:&nbsp;</strong></td>
              <td><span>{userName}</span></td>
            </tr>
            <tr>
              <td><strong>Email:&nbsp;</strong></td>
              <td><span>{email}</span></td>
            </tr>
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

AccountInfoView.propTypes = propTypes;
