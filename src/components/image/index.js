import React from 'react';
import PropTypes from 'prop-types';

// import './index.css';

const Image = ({ src, alt, sources, dataId }) => (
  <picture data-qa="image" data-id={dataId}>
    {sources.map(({ srcSet, width }) => (
      <source srcSet={srcSet} media={`(min-width: ${width}px)`} key={srcSet} />
    ))}
    <img src={src} alt={alt} />
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
  ),
  dataId: PropTypes.string
};

Image.defaultProps = {
  sources: [],
  dataId: null
};

export default Image;
