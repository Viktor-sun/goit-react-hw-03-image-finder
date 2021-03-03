import React from 'react';
import PropTypes from 'prop-types';
import defaultImg from '../../assets/images/default1280.jpg';

const ModalImg = ({ url, onBtnCloseModal }) => (
  <>
    <img src={url} alt="" />
    <button onClick={onBtnCloseModal} type="button">
      close
    </button>
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
