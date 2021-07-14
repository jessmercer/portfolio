import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

const Textarea = ({ type, onChange, name }) => (
  <textarea
    type={type}
    className={styles.textarea}
    onChange={onChange}
    name={name}
    id={name}
  />
);

Textarea.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string
};

Textarea.defaultProps = {
  type: 'text'
};

export default Textarea;
