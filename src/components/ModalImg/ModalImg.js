import React from 'react';
import PropTypes from 'prop-types';
import defaultImg from '../../assets/images/default1280.jpg';
import './ModalImg.scss';

const ModalImg = ({ url, onBtnCloseModal }) => (
  <>
    <img src={url} alt="" className="ModalImg" />
    <button
      className="button__close-modal"
      onClick={onBtnCloseModal}
      type="button"
    ></button>
  </>
);

ModalImg.defaultProps = {
  url: defaultImg,
};

ModalImg.propTypes = {
  url: PropTypes.string,
  onBtnCloseModal: PropTypes.func.isRequired,
};

export default ModalImg;
