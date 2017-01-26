import React, { PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import styles from './styles.less';

const propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  replace: PropTypes.bool,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};

const defaultProps = {
  replace: false
};

export default withRouter(MenuLink);

function MenuLink({ to, title, replace, router }) {
  return (
    <Link className={styles.link} activeClassName={styles.activeLink} to={to} onClick={onClick}>{title}</Link>
  );

  function onClick(event) {
    if (!replace) {
      return;
    }
    event.preventDefault();
    router.replace(to);
  }
}

MenuLink.propTypes = propTypes;
MenuLink.defaultProps = defaultProps;
