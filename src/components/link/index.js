import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReactRouterLink } from 'react-router-dom';

import './index.css';

const Link = ({ children, to, dataId }) => (
  <span data-qa="link" data-id={dataId}>
    <ReactRouterLink className="link" to={to}>
      {children}
    </ReactRouterLink>
  </span>
);

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  dataId: PropTypes.string
};

Link.defaultProps = {
  dataId: ''
};

export default Link;
