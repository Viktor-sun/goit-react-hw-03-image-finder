import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import './ImageGallery.scss';

const ImageGallery = ({ images, onOpenModal }) => (
  <ul className="ImageGallery">
    {images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <li key={id} className="ImageGalleryItem">
        <ImageGalleryItem
          url={webformatURL}
          title={tags}
          onOpenModal={() => onOpenModal(largeImageURL)}
        />
      </li>
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    }),
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
