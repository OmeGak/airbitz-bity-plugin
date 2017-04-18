import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { selectors as authStoreSelectors } from '../common-data/auth';

const WRAPPER_DISPLAY_NAME = 'OnlyGuestRoute';

const REDIRECT_URL = '/';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired
};

export default function onlyGuestRoute(DecoratedComponent) {
  const decoratedComponentDisplayName =
    DecoratedComponent.displayName || DecoratedComponent.name || 'Component';
  const displayName = `${WRAPPER_DISPLAY_NAME}(${decoratedComponentDisplayName})`;

  class OnlyGuestRoute extends Component {
    static displayName = displayName;
    static propTypes = propTypes;

    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.onGuestAccess();
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.isAuthenticated) {
        this.onGuestAccess();
      }
    }

    onGuestAccess() {
      this.props.router.replace(REDIRECT_URL);
    }

    render() {
      const { isAuthenticated, router, ...rest } = this.props; // eslint-disable-line no-unused-vars
      return isAuthenticated ? null : (<DecoratedComponent {...rest} />);
    }
  }

  return connectToStore(withRouter(OnlyGuestRoute));
}

function connectToStore(DecoratedComponent) {
  return connect(mapStateToProps)(DecoratedComponent);
}

function mapStateToProps(state) {
  return {
    isAuthenticated: authStoreSelectors.isAuthenticated(state)
  };
}
