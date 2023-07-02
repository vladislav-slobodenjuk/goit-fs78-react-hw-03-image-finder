import PropTypes from 'prop-types';

export function ImageGalleryItem({ src, tags }) {
  return (
    <li>
      <img src={src} alt={`${tags}`} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
