import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './index.module.css';

const Tile = ({ children }) => <div className={styles.tile}>{children}</div>;

const Tiles = ({ children }) => (
  <div
    className={cx(styles.tiles, {
      [styles.isFullWidth]: !Array.isArray(children)
    })}
  >
    {children}
  </div>
);

Tiles.Tile = Tile;

Tile.propTypes = {
  children: PropTypes.node.isRequired,
  dataId: PropTypes.string
};

Tile.defaultProps = {
  dataId: null
};

Tiles.propTypes = {
  children: PropTypes.node.isRequired
};

export default Tiles;
