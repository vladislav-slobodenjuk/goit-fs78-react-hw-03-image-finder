import PropTypes from 'prop-types';
import { Img, Item } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ src, tags, large }) {
  return (
    <Item onClick={() => console.log(large)}>
      <Img src={src} alt={`${tags}`} />
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
