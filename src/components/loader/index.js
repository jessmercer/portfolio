import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './index.module.css';

const Loader = ({ color, style }) => (
  <div className={cx(styles.loaderWrapper)}>
    <div className={styles.loader}>
      <div
        className={cx(
          styles.loaderDot,
          styles.loaderDot1,
          styles[color],
          styles[style]
        )}
      ></div>
      <div
        className={cx(
          styles.loaderDot,
          styles.loaderDot2,
          styles[color],
          styles[style]
        )}
      ></div>
      <div
        className={cx(
          styles.loaderDot,
          styles.loaderDot3,
          styles[color],
          styles[style]
        )}
      ></div>
    </div>
    <span className={styles.text}>Loading</span>
  </div>
);

Loader.colors = {
  black: 'black',
  white: 'white'
};

Loader.styles = {
  large: 'large',
  small: 'small'
};

Loader.propTypes = {
  color: PropTypes.oneOf(Object.values(Loader.colors)),
  style: PropTypes.oneOf(Object.values(Loader.styles))
};

Loader.defaultProps = {
  color: Loader.colors.black,
  style: Loader.styles.large
};

export default Loader;
