import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ images }) => {
  return(
    <Gallery>
      {
        images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            imgUrlS={webformatURL}
            imgUrlL={largeImageURL}
            tags={tags}
          />
        ))
      }
    
  </Gallery>
)}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }))
}

export default ImageGallery