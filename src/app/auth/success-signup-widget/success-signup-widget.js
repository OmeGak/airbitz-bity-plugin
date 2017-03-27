import React, { PropTypes } from 'react';
import { Card, CardHeader, CardBody } from '../../lib/card';
import ExternalLink from '../../lib/external-link';
import Link from '../../lib/link';

import styles from './styles.less';

const propTypes = {
  registrationData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired
};

export default function SuccessSignupWidget(props) {
  const {
    registrationData: {
      username,
      phoneNumber,
      password
    }
  } = props;

  return (
    <Card>
      <CardHeader>
        <span>Registration succeeded</span>
      </CardHeader>
      <CardBody>
        <div className={styles.registrationDataSection}>
          <div className={styles.registrationDataHeader}>Registration data</div>
          <table className={styles.registrationData}>
            <tbody>
              <tr>
                <td><strong>Username:&nbsp;</strong></td>
                <td><span>{username}</span></td>
              </tr>
              <tr>
                <td><strong>Phone number:&nbsp;</strong></td>
                <td><span>{phoneNumber}</span></td>
              </tr>
              <tr>
                <td><strong>Password:&nbsp;</strong></td>
                <td><span>{password}</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>A confirmation SMS was sent to you. Verify your phone number
        on <ExternalLink href="https://bity.com/">bity.com</ExternalLink></div>

        <div className={styles.footer}>
          <Link to="/login" replace className="btn btn-primary btn-block">Login</Link>
        </div>
      </CardBody>
    </Card>
  );
}

SuccessSignupWidget.propTypes = propTypes;
