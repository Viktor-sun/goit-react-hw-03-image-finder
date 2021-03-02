import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import './ImageGallery.css';

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

export default ImageGallery;
