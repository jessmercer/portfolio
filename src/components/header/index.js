import React from 'react';

import Link from '../../components/link';
import Text from '../../components/text';
import { routes } from '../../lib/constants';

import styles from './index.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.nameContainer}>
      <div className={styles.name}>
        <Text element={Text.elements.span} style={Text.styles.large}>
          <Link to={routes.home}>Jessica Mercer</Link>
        </Text>
      </div>
      <Text>Front End Web Developer</Text>
    </div>
    <div className={styles.nav}>
      <div className={styles.navLink}>
        <Text element={Text.elements.span}>
          <Link to={routes.contact}>Contact</Link>
        </Text>
      </div>
    </div>
  </header>
);

export default Header;
