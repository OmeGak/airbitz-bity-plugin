import React, { PropTypes } from 'react';
/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import * as airbitz from 'airbitzPluginApi';
/* eslint-enable import/no-extraneous-dependencies, import/extensions */

const propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node
};

const defaultProps = {
  children: null
};

export default function ExternalLink(props) {
  const { href, children, ...otherProps } = props;
  return (
    <a href={href} {...otherProps} onClick={onClick}>{children}</a>
  );

  function onClick(event) {
    event.preventDefault();
    airbitz.ui.launchExternal(href);
  }
}

ExternalLink.propTypes = propTypes;
ExternalLink.defaultProps = defaultProps;
