import React, { useState, useEffect } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { CircleArrow as ScrollUpButton } from 'react-scroll-up-button';
import Container from './components/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import ModalImg from './components/ModalImg';
import TitleOnError from './components/TitleOnError';
import newImagesApi from './services/images-api';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bigImageUrl, setBigImageUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = () => {
      setIsLoading(true);

      newImagesApi(searchQuery, currentPage)
        .then(({ hits, totalHits }) => {
          setImages(prevImages => [...prevImages, ...hits]);
          setTotalImages(totalHits);

          // if (images.length > 11) {
          //   window.scrollTo({
          //     top: document.documentElement.scrollHeight,
          //     behavior: 'smooth',
          //   });
          // }
        })
        .catch(error => setError(error))
        .finally(() => setIsLoading(false));
    };

    fetchImages();
  }, [searchQuery, currentPage]);

  const setPage = () => setCurrentPage(prevPage => prevPage + 1);

  const handleFormSubmit = query => {
    setCurrentPage(1);
    setSearchQuery(query);
    setImages([]);
    setTotalImages(null);
    setBigImageUrl(null);
    setError(null);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const handleOpenModal = url => {
    setBigImageUrl(url);
    toggleModal();
  };

  const shouldRenderLoadMoreButton =
    images.length > 0 && !isLoading && images.length !== totalImages;

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <TitleOnError />}

      <ImageGallery images={images} onOpenModal={handleOpenModal} />

      {shouldRenderLoadMoreButton && <Button handleOnClick={setPage} />}

      {isLoading && (
        <Loader
          type="ThreeDots"
          color="#3f51b5"
          height={50}
          width={80}
          style={{ display: 'flex', justifyContent: 'center' }}
        />
      )}

      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <ModalImg url={bigImageUrl} onBtnCloseModal={toggleModal} />
        </Modal>
      )}

      {!showModal && <ScrollUpButton />}
    </Container>
  );
}
