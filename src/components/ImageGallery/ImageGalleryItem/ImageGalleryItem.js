import React from 'react';
import defaultImg from '../../../assets/images/default640.jpg';

const ImageGalleryItem = ({ url, title, onOpenModal }) => (
  <img
    onClick={onOpenModal}
    src={url}
    alt={title}
    className="ImageGalleryItem-image"
  />
);

ImageGalleryItem.defaultProps = {
  url: defaultImg,
  title: 'type__photo',
};

export default ImageGalleryItem;
