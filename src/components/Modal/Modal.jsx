import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import { Overlay, ModalBlock } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({onClick, imgUrl}) => {
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
