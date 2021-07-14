import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './index.module.css';

const TextInput = ({ type, isValid, isInvalid, onChange, name }) => (
  <input
    type={type}
    className={cx(styles.textInput, {
      [styles.isValid]: isValid,
      [styles.isInvalid]: isInvalid
    })}
    onChange={onChange}
    name={name}
    id={name}
    aria-label={name}
  />
);

TextInput.types = {
  text: 'text',
  password: 'password',
  email: 'email'
};

TextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(TextInput.types)),
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool
};

TextInput.defaultProps = {
  type: TextInput.types.text,
  isValid: false,
  isInvalid: false
};

export default TextInput;
