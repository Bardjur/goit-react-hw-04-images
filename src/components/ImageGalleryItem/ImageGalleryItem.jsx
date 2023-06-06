import PropTypes from 'prop-types';
import React from 'react';
import { GalleryItem } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

class ImageGalleryItem extends React.Component {
  state = {
    isOpen:false
  }

  static propTypes = {
    imgUrlS: PropTypes.string.isRequired,
    imgUrlL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }

  handleClick = () => {
    this.setState({isOpen: !this.state.isOpen})
  }
  
  render() {
    const { imgUrlS, imgUrlL, tags } = this.props

    return (
      <GalleryItem onClick={this.handleClick}>
        <img src={imgUrlS} alt={tags} />
        {this.state.isOpen && <Modal onClick={this.handleClick} imgUrl={imgUrlL}/>}
      </GalleryItem>
    )
  }
}

export default ImageGalleryItem;
