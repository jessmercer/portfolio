import React from 'react';
import PropTypes from 'prop-types';

const Source = ({ srcSet, width }) => (
  <source
    srcSet={srcSet}
    data-testid={srcSet}
    media={`(min-width: ${width}px)`}
  />
);

Source.propTypes = {
  srcSet: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
};

const Image = ({ src, alt, sources }) => (
  <picture>
    {sources.map(({ srcSet, width }) => (
      <Source srcSet={srcSet} width={width} key={srcSet} />
    ))}
    <img src={src} alt={alt} data-src={src} />
  </picture>
);

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      srcSet: PropTypes.string,
      width: PropTypes.number
    })
  )
};

Image.defaultProps = {
  sources: []
};

export default Image;
