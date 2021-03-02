import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
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

export default Modal;
