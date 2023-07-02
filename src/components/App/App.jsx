import { Component } from 'react';
import { getImages } from 'services/api';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    search: '',
    images: [],
  };

  handleSubmit = async e => {
    e.preventDefault();

    const search = e.target.search.value.trim();
    this.setState({ search });
  };

  openModal = () => {};

  async componentDidUpdate(_, prevState) {
    if (prevState.search !== this.state.search) {
      const images = await getImages(this.state.search);
      this.setState({ images });
    }

    // if (prevState.search === this.state.search && ) { }
  }

  render() {
    const { images } = this.state;
    // console.log('render');

    return (
      <Container>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
      </Container>
    );
  }
}
