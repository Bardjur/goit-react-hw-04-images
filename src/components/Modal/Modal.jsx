import React from 'react';
import {createPortal} from 'react-dom';
import { Overlay, ModalBlock } from './Modal.styled';


const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  render() {
    return createPortal(
      (
        <Overlay onClick={this.props.onClick}>
          <ModalBlock>
            <img src={this.props.imgUrl} alt="" />
          </ModalBlock>
        </Overlay>
      ),
      modalRoot
    )
  }
}

export default Modal