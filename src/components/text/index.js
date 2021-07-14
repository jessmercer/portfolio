import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './index.module.css';

const Text = ({ children, element: Element, color, style }) => (
  <Element className={cx(styles.text, styles[style], styles[color])}>
    {children}
  </Element>
);

Text.styles = {
  large: 'large',
  medium: 'medium',
  small: 'small'
};

Text.elements = {
  p: 'p',
  span: 'span',
  h1: 'h1'
};

Text.colors = {
  grey: 'grey',
  black: 'black',
  red: 'red',
  white: 'white'
};

Text.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  element: PropTypes.oneOf(Object.values(Text.elements)),
  color: PropTypes.oneOf(Object.values(Text.colors)),
  style: PropTypes.oneOf(Object.values(Text.styles))
};

Text.defaultProps = {
  element: Text.elements.p,
  color: Text.colors.black,
  style: Text.styles.small
};

export default Text;
