import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.scss';

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.querySelector('html').setAttribute('style', 'overflow: hidden');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.querySelector('html').removeAttribute('style');
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleCloseOverlay = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleCloseOverlay}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      document.getElementById('modal-root'),
    );
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
