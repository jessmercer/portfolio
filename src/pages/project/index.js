import React from 'react';
import { useParams } from 'react-router-dom';

import ErrorMessage from '../../components/error-message';
import Image from '../../components/image';
import Link from '../../components/link';
import PageLoader from '../../components/pageloader';
import Text from '../../components/text';
import Tiles from '../../components/tiles';
import Wrapper from '../../components/wrapper';

import useQuery, { services } from '../../lib/hooks/use-query';

import styles from './index.module.css';

export default () => {
  const params = useParams();
  const projectQuery = useQuery(services.project, {
    options: { params: { slug: params.slug } }
  });
  const project = projectQuery?.data?.[0] || [];

  if (projectQuery.isError || (!project && !projectQuery.isLoading)) {
    return (
      <ErrorMessage>
        Oops, something went wrong with loading the project.
      </ErrorMessage>
    );
  }

  if (projectQuery.isLoading || projectQuery.isFetching) {
    return <PageLoader />;
  }

  const titleRendered = project.title.rendered;
  const { image, tools, created_with, project_link } = project.acf;

  const { sizes } = image;

  return (
    <div className={styles.project}>
      <Wrapper>
        <Tiles>
          <Tiles.Tile>
            <div className={styles.projectTitle}>
              <Text
                element={Text.elements.h1}
                style={Text.styles.large}
                dataId="title"
              >
                {titleRendered}
              </Text>
            </div>
            <div>
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
            <div className={styles.projectCreated}>
              <Text style={Text.styles.medium} dataId="created-width">
                Created with: {created_with}
              </Text>
            </div>
            <div className={styles.projectTools}>
              <Text style={Text.styles.medium} dataId="tools">
                Tools used: {tools}
              </Text>
            </div>
            {project_link && (
              <div className={styles.projectLink}>
                <Text>
                  <Link to={project_link.url} isAnchor isExternal>
                    {project_link.title}
                  </Link>
                </Text>
              </div>
            )}
          </Tiles.Tile>
        </Tiles>
      </Wrapper>
    </div>
  );
};
