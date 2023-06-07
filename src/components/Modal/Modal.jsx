import React from "react";
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import { Overlay, ModalBlock } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handlerKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handlerKey);
  }

  handlerKey = (e) => {
    if (e.key === "Escape") {
      this.props.onClick();
    }
  }

  render() {
    const {onClick, imgUrl} = this.props;
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
  
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
}

export default Modal
