import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Text from '../../components/text';
import Tiles from '../../components/tiles';
import Image from '../../components/image';
import Loader from '../../components/loader';
import ErrorMessage from '../../components/error-message';
import Wrapper from '../../components/wrapper';

import { requestProjects } from '../../actions/projects-actions';

import './index.css';

export default () => {
  const dispatch = useDispatch();
  const {
    isInitial: isProjectsInitial,
    isPending: isProjectsPending,
    hasError: hasProjectsError,
    data
  } = useSelector(state => state.projects);
  const { slug } = useParams();
  const project = data[0];

  useEffect(() => {
    dispatch(requestProjects(slug));
  }, [dispatch, slug]);

  if (
    hasProjectsError ||
    (!project && !isProjectsInitial && !isProjectsPending)
  ) {
    return (
      <ErrorMessage>
        Oops, something went wrong with loading the project.
      </ErrorMessage>
    );
  }

  if (isProjectsInitial || isProjectsPending) {
    return <Loader />;
  }

  const titleRendered = project.title.rendered;
  const { image, tools } = project.acf;
  const { sizes } = image;

  return (
    <div className="project">
      <Wrapper>
        <Tiles>
          <Tiles.Tile>
            <div className="project__title">
              <Text style={Text.styles.medium}>{titleRendered}</Text>
            </div>
            <div className="project__img">
              <Image
                src={sizes.medium_large}
                alt={titleRendered}
                sources={[
                  {
                    srcSet: sizes['1536x1536'],
                    width: sizes['medium_large-width']
                  },
                  {
                    srcSet: sizes['twentytwenty-fullscreen'],
                    width: sizes['1536x1536-width']
                  }
                ]}
              />
            </div>
            <div className="project__tools">
              <Text style={Text.styles.medium}>Tools used: {tools}</Text>
            </div>
          </Tiles.Tile>
        </Tiles>
      </Wrapper>
    </div>
  );
};