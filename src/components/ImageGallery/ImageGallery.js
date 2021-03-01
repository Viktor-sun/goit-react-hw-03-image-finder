import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import './ImageGallery.css';

const ImageGallery = ({ images }) => (
  <ul className="ImageGallery">
    {images.map(({ id, webformatURL, tags }) => (
      <li key={id} className="ImageGalleryItem">
        <ImageGalleryItem url={webformatURL} title={tags} />
      </li>
    ))}
  </ul>
);

export default ImageGallery;
