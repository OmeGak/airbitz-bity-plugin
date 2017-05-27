import React, { PropTypes } from 'react';
import { Card, CardHeader, CardBody } from '../../lib/card';
import ExternalLink from '../../lib/external-link';
import Link from '../../lib/link';
import AboutUsLink from '../../lib/about-us-link';

import styles from './styles.less';

const propTypes = {
  registrationData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string.isRequired
  }).isRequired
};

const defaultProps = {
  email: '',
  phoneNumber: ''
};

export default function SuccessSignupWidget(props) {
  const {
    registrationData: {
      username,
      email,
      phoneNumber,
      password
    }
  } = props;

  let emailNode = null;
  const hasEmail = typeof email === 'string' && email.length > 0;
  if (hasEmail) {
    emailNode = (
      <tr>
        <td><strong>Email:&nbsp;</strong></td>
        <td className={styles.fieldValue}><span>{email}</span></td>
      </tr>
    );
  }

  const hasPhoneNumber = typeof phoneNumber === 'string' && phoneNumber.length > 0;
  let phoneNumberNode = null;
  if (hasPhoneNumber) {
    phoneNumberNode = (
      <tr>
        <td><strong>Phone number:&nbsp;</strong></td>
        <td className={styles.fieldValue}><span>{phoneNumber}</span></td>
      </tr>
    );
  }

  let notesNode = null;
  switch (true) {
    case hasEmail:
      notesNode = (
        <div>
          <div>A confirmation email was sent to you. Please check your inbox,
            including the spam or junk folder, and follow the instructions to activate your account.
          </div>
        </div>
      );
      break;
    case hasPhoneNumber:
      notesNode = (
        <div>A confirmation SMS was sent to you. Verify your phone number
          on <ExternalLink href="https://bity.com/">bity.com</ExternalLink></div>
      );
      break;
  }

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
                <td className={styles.fieldValue}><span>{username}</span></td>
              </tr>
              {emailNode}
              {phoneNumberNode}
              <tr>
                <td><strong>Password:&nbsp;</strong></td>
                <td className={styles.fieldValue}><span>{password}</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {notesNode}

        <div className={styles.footer}>
          <Link to="/login" replace className="btn btn-primary btn-block">Login</Link>
        </div>
        <AboutUsLink />
      </CardBody>
    </Card>
  );
}

SuccessSignupWidget.propTypes = propTypes;
SuccessSignupWidget.defaultProps = defaultProps;
