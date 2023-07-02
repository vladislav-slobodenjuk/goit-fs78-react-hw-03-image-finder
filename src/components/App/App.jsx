import { Component } from 'react';
import { getImages } from 'services/api';

import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    images: [],
    modal: { isOpen: false, img: null },
    error: null,
  };

  handleSubmit = async e => {
    e.preventDefault();
    const search = e.target.search.value.trim();

    if (search.length === 0) return console.log('empty qerry');
    this.setState({ search });
  };

  openModal = img => {
    this.setState({ modal: { isOpen: true, img } });
  };

  closeModal = () => {
    this.setState({ modal: { isOpen: false, img: null } });
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.search !== this.state.search) {
      try {
        //show loader
        const images = await getImages(this.state.search);
        this.setState({ images });
      } catch (error) {
        this.setState({ error });
        console.log(error.message);
        //show notification
      } finally {
        //hide loader
      }
    }

    // if (prevState.search === this.state.search && ) { }
  }

  render() {
    const { images, modal } = this.state;
    // console.log('render');

    return (
      <Container>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery images={images} onImgClick={this.openModal} />
        {modal.isOpen && (
          <Modal img={modal.img} onCloseModal={this.closeModal} />
        )}
      </Container>
    );
  }
}
// Modal;
