import React, { Component } from 'react';
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

class App extends Component {
  state = {
    currentPage: 1,
    searchQuery: '',
    images: [],
    totalImages: null,
    isLoading: false,
    error: null,
    showModal: false,
    bigImageUrl: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({
      currentPage: 1,
      searchQuery: query,
      images: [],
      totalImages: null,
      error: null,
      bigImageUrl: null,
    });
  };

  fetchImages = () => {
    const { searchQuery, currentPage, images } = this.state;
    this.setState({ isLoading: true });

    newImagesApi(searchQuery, currentPage)
      .then(({ hits, totalHits }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
          totalImages: totalHits,
        }));

        if (images.length > 11) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  handleOpenModal = url => {
    this.setState({ bigImageUrl: url });
    this.toggleModal();
  };

  render() {
    const {
      images,
      isLoading,
      totalImages,
      error,
      showModal,
      bigImageUrl,
    } = this.state;

    const shouldRenderLoadMoreButton =
      images.length > 0 && !isLoading && images.length !== totalImages;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && <TitleOnError />}

        <ImageGallery images={images} onOpenModal={this.handleOpenModal} />

        {shouldRenderLoadMoreButton && (
          <Button handleOnClick={this.fetchImages} />
        )}

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
          <Modal onCloseModal={this.toggleModal}>
            <ModalImg url={bigImageUrl} onBtnCloseModal={this.toggleModal} />
          </Modal>
        )}

        {!showModal && <ScrollUpButton />}
      </Container>
    );
  }
}

export default App;
