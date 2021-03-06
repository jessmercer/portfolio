import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReactRouterLink } from 'react-router-dom';

import styles from './index.module.css';

const Link = ({ children, to, isAnchor, isExternal }) => (
  <span>
    {isAnchor ? (
      <a
        href={to}
        {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
        className={styles.link}
      >
        {children}
      </a>
    ) : (
      <ReactRouterLink className={styles.link} to={to}>
        {children}
      </ReactRouterLink>
    )}
  </span>
);

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isAnchor: PropTypes.bool,
  isExternal: PropTypes.bool
};

Link.defaultProps = {
  isAnchor: false,
  isExternal: false
};

export default Link;
