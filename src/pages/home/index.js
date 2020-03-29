import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Element as ScrollElement } from 'react-scroll';

import Text from '../../components/text';
import Tiles from '../../components/tiles';
import Image from '../../components/image';
import Link from '../../components/link';
import Loader from '../../components/loader';
import ErrorMessage from '../../components/error-message';
import Wrapper from '../../components/wrapper';

import { requestHome } from '../../actions/home-actions';
import { requestProjects } from '../../actions/projects-actions';

import { routes, prependRequest } from '../../lib/constants';

import './index.css';

const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))

export default () => {
  const dispatch = useDispatch();
  const {
    isInitial: isHomeInitial,
    isPending: isHomePending,
    hasError: hasHomeError,
    data: home
  } = useSelector(state => state.home);
  const {
    isInitial: isProjectsInitial,
    isPending: isProjectsPending,
    hasError: hasProjectsError,
    data: projects
  } = useSelector(state => state.projects);

  useEffect(() => {
    dispatch(requestHome());
    dispatch(requestProjects());
  }, []);

  const [test, setTest] = useState('');

  useEffect(() => {
    toDataURL(prependRequest + 'http://www.boggonbone.co.uk/api/wp-content/uploads/2020/03/test_image_2-scaled.jpeg').then(img => setTest(img))
  }, [test])

  if (
    isHomeInitial ||
    isHomePending ||
    isProjectsInitial ||
    isProjectsPending
  ) {
    return <Loader />;
  }

  if (hasHomeError || hasProjectsError) {
    return (
      <ErrorMessage>
        Oops, something went wrong with loading the homepage.
      </ErrorMessage>
    );
  }

  return (
    <div className="home">
      <Wrapper>
        <div className="description">
          <Text style={Text.styles.medium}>{home.acf.description}</Text>
        </div>

        <ScrollElement name="projects" className="page-heading">
          <Text element={Text.elements.h1} style={Text.styles.large}>
            {home.acf.heading}
          </Text>
        </ScrollElement>

        <Tiles>
          {projects.map(({ slug, title, acf }) => {
            const titleRendered = title.rendered;

            return (
              <Tiles.Tile key={titleRendered}>
                <Link to={`${routes.project}/${slug}`}>
                  <div className="project__img">
                    <Image
                      src={test}
                    />
                    <Image
                      src={acf.image.sizes.medium_large}
                      alt={titleRendered}
                      sources={[
                        {
                          srcSet: acf.image.sizes['1536x1536'],
                          width: acf.image.sizes['1536x1536-width']
                        }
                      ]}
                    />
                  </div>
                  <div className="project__title">
                    <Text style={Text.styles.medium}>{titleRendered}</Text>
                  </div>
                </Link>
              </Tiles.Tile>
            );
          })}
        </Tiles>
      </Wrapper>
    </div>
  );
};
