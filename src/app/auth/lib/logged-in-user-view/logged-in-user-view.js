import React, { PropTypes } from 'react';

const propTypes = {
  logout: PropTypes.func.isRequired
};

export default function LoggedInUserView({ logout }) {
  return (
    <div>
      <div>already logged in</div>
      <div>
        <button type="button" className="btn btn-primary" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

LoggedInUserView.propTypes = propTypes;
