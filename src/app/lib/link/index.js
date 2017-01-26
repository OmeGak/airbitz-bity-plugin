// Add the support for the action 'replace'

import React, { PropTypes } from 'react';
import { Link as OriginalLink, withRouter } from 'react-router';

export default withRouter(Link);

const propTypes = {
  to: PropTypes.string.isRequired,
  replace: PropTypes.bool,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};

const defaultProps = {
  replace: false
};

function Link(props) {
  const { to, replace, router, ...otherProps } = props;
  const { params, location, routes, ...otherLinkProps } = otherProps; // eslint-disable-line no-unused-vars
  return (
    <OriginalLink to={to} onClick={onClick} {...otherLinkProps} />
  );

  function onClick(event) {
    if (!replace) {
      return;
    }
    event.preventDefault();
    router.replace(to);
  }
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;
