import React, { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import newImagesApi from './services/images-api';

import './App.css';

class App extends Component {
  state = {
    currentPage: 1,
    searchQuery: '',
    images: [],
    totalImages: null,
    isLoading: false,
    error: null,
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

        if (images.length > 12) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { images, isLoading, totalImages, error } = this.state;

    const shouldRenderLoadMoreButton =
      images.length > 0 && !isLoading && images.length !== totalImages;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && <h1>Oops, something went wrong!!!</h1>}
        <ImageGallery images={images} />
        {shouldRenderLoadMoreButton && (
          <Button handleOnClick={this.fetchImages} />
        )}

        {isLoading && (
          <Loader
            type="ThreeDots"
            color="#3f51b5"
            height={50}
            width={80}
            className="Loader"
          />
        )}
      </div>
    );
  }
}

export default App;
