import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { selectors as authStoreSelectors } from '../common-data/auth';

const WRAPPER_DISPLAY_NAME = 'ProtectedRoute';

const REDIRECT_URL = '/signup';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};

export default function protectedRoute(DecoratedComponent) {
  const decoratedComponentDisplayName =
    DecoratedComponent.displayName || DecoratedComponent.name || 'Component';
  const displayName = `${WRAPPER_DISPLAY_NAME}(${decoratedComponentDisplayName})`;

  class ProtectedRoute extends Component {
    static displayName = displayName;
    static propTypes = propTypes;

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.onUnauthAccess();
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.onUnauthAccess();
      }
    }

    onUnauthAccess() {
      this.props.router.replace(REDIRECT_URL);
    }

    render() {
      const { isAuthenticated, router, ...rest } = this.props; // eslint-disable-line no-unused-vars
      return isAuthenticated ? (<DecoratedComponent {...rest} />) : null;
    }
  }

  return connectToStore(withRouter(ProtectedRoute));
}

function connectToStore(DecoratedComponent) {
  return connect(mapStateToProps)(DecoratedComponent);
}

function mapStateToProps(state) {
  return {
    isAuthenticated: authStoreSelectors.isAuthenticated(state)
  };
}
