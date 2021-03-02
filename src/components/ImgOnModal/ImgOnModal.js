import React from 'react';

const ImgOnModal = ({ url, onBtnCloseModal }) => (
  <>
    <img src={url} alt="" />
    <button onClick={onBtnCloseModal} type="button">
      close
    </button>
  </>
);

export default ImgOnModal;
