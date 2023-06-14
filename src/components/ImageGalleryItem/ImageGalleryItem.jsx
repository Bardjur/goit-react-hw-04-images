import PropTypes from 'prop-types';
import React, {useState} from 'react';
import { GalleryItem } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

const ImageGalleryItem = ({ imgUrlS, imgUrlL, tags }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <GalleryItem onClick={handleClick}>
      <img src={imgUrlS} alt={tags} />
      {isOpen && <Modal onClick={handleClick} imgUrl={imgUrlL}/>}
    </GalleryItem>
  )
}

ImageGalleryItem.propTypes = {
  imgUrlS: PropTypes.string.isRequired,
  imgUrlL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
}

export default ImageGalleryItem;
