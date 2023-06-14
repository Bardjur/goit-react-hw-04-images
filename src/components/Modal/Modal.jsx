import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import { Overlay, ModalBlock } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({onClick, imgUrl}) => {
  useEffect(() => {
    const handlerKey = (e) => {
      if (e.key === "Escape") {
        onClick();
      }
    }

    document.addEventListener('keydown', handlerKey);

    return () => {
      document.removeEventListener('keydown', handlerKey);
    }
  }, [onClick]);

  return createPortal(
    (
      <Overlay onClick={onClick}>
        <ModalBlock>
          <img src={imgUrl} alt="" />
        </ModalBlock>
      </Overlay>
    ),
    modalRoot
  )
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
}

export default Modal
