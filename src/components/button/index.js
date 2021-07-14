import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Loader from '../loader';

import styles from './index.module.css';

const Button = ({ children, isDisabled, isLoading, type, onClick }) => (
  <button
    type={type}
    className={cx(styles.button, {
      [styles.isDisabled]: isDisabled,
      [styles.isLoading]: isLoading
    })}
    disabled={isDisabled || isLoading}
    onClick={onClick}
  >
    {isLoading ? (
      <span className={styles.buttonLoaderWrapper}>
        <Loader color={Loader.colors.white} style={Loader.styles.small} />
      </span>
    ) : null}
    <span className={styles.buttonText}>{children}</span>
  </button>
);

Button.types = {
  submit: 'submit',
  button: 'button',
  reset: 'reset'
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(Button.types)),
  onClick: PropTypes.func
};

Button.defaultProps = {
  isDisabled: false,
  isLoading: false,
  type: 'submit',
  onClick: undefined
};

export default Button;
