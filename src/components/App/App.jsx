import { Component } from 'react';
import { PER_PAGE, getImages } from 'services/api';

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
    totalPages: 1,
    images: [],
    modal: { isOpen: false, img: null },
    error: null,
    isLoading: false,
  };

  handleSubmit = async e => {
    e.preventDefault();
    const querry = e.target.search.value.trim();

    if (querry.length === 0) return console.log('empty querry');
    if (querry === this.state.search) return console.log('same querry');

    this.setState({ search: querry, page: 1, totalPages: 1 });
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

        const { hits, totalHits } = await getImages(search, page);
        this.setState({
          images: hits,
          totalPages: Math.ceil(totalHits / PER_PAGE),
        });
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

        const { hits } = await getImages(search, page);
        this.setState({ images: [...prevState.images, ...hits] });
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
    const { images, modal, isLoading, page, totalPages } = this.state;
    // console.log('render');

    return (
      <Container>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery images={images} onImgClick={this.openModal} />

        {images.length > 0 && page < totalPages && (
          <Button text="Load more" onButtonClick={this.loadMore} />
        )}

        {page === totalPages && page !== 1 && <p>That's all</p>}

        {isLoading && <Loader />}

        {modal.isOpen && (
          <Modal img={modal.img} onCloseModal={this.closeModal} />
        )}
      </Container>
    );
  }
}
