import { Component } from 'react';
import { getImages } from 'services/api';

import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    search: '',
    page: 1,
    images: [],
    modal: { isOpen: false, img: null },
    error: null,
    isLoading: false,
  };

  handleSubmit = async e => {
    e.preventDefault();
    const search = e.target.search.value.trim();

    if (search.length === 0) return console.log('empty qerry');
    this.setState({ search, page: 1 });
  };

  openModal = img => {
    this.setState({ modal: { isOpen: true, img } });
  };

  closeModal = () => {
    this.setState({ modal: { isOpen: false, img: null } });
  };

  loadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    if (prevState.search !== search) {
      try {
        this.setState({ isLoading: true });

        const images = await getImages(search, page);
        this.setState({ images });
        //
      } catch (error) {
        this.setState({ error });
        console.log(error.message);
        //show notification
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (prevState.page !== page && page !== 1) {
      try {
        this.setState({ isLoading: true });

        const images = await getImages(search, page);
        this.setState({ images: [...prevState.images, ...images] });
        //
      } catch (error) {
        this.setState({ error });
        console.log(error.message);
        //show notification
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { images, modal, isLoading } = this.state;
    // console.log('render');

    return (
      <Container>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery images={images} onImgClick={this.openModal} />

        {images.length > 0 && (
          <Button text="Load more" onButtonClick={this.loadMore} />
        )}

        {isLoading && <Loader />}

        {modal.isOpen && (
          <Modal img={modal.img} onCloseModal={this.closeModal} />
        )}
      </Container>
    );
  }
}
