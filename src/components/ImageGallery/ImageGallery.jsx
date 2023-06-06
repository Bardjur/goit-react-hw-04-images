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

export default ImageGallery