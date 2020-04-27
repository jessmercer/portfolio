import React from 'react';
import cx from 'classnames';

import styles from './index.module.css';

const Loader = () => (
  <div className={styles.loaderWrapper} data-qa="loader">
    <div className={styles.loader}>
      <div className={cx(styles.loaderDot, styles.loaderDot1)}></div>
      <div className={cx(styles.loaderDot, styles.loaderDot2)}></div>
      <div className={cx(styles.loaderDot, styles.loaderDot3)}></div>
    </div>
  </div>
);

export default Loader;
