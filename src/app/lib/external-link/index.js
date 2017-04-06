import React, { PropTypes } from 'react';

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
    window.Airbitz.ui.launchExternal(href);
  }
}

ExternalLink.propTypes = propTypes;
ExternalLink.defaultProps = defaultProps;
