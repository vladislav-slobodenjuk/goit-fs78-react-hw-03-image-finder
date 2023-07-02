import PropTypes from 'prop-types';

import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export function ImageGallery({ images }) {
  return (
    <GalleryList>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          tags={tags}
          src={webformatURL}
          large={largeImageURL}
        />
      ))}
    </GalleryList>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
