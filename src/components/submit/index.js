import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './index.module.css';

const Submit = ({ children, isDisabled }) => (
  <button
    type="submit"
    data-qa="submit"
    className={cx(styles.submit, {
      [styles.isDisabled]: isDisabled
    })}
  >
    {children}
  </button>
);

Submit.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool
};

Submit.defaultProps = {
  isDisabled: false
};

export default Submit;
