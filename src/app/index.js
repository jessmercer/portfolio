import { HashRouter, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';

import Header from '../components/header';
import Contact from '../pages/contact';
import Home from '../pages/home';
import Project from '../pages/project';

import { routes } from '../lib/constants';

import styles from './index.module.css';

const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <div className={styles.body}>
        <Header />
        <Route path={routes.home} exact component={Home} />
        <Route path={`${routes.project}/:slug`} component={Project} />
        <Route path={routes.contact} exact component={Contact} />
      </div>
    </HashRouter>
  </QueryClientProvider>
);
