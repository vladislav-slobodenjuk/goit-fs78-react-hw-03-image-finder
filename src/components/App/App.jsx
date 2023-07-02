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
    // console.log('here it is');
    // console.log(e.target.search.value.trim());
    const search = e.target.search.value.trim();
    // const images = await getImages(search);
    // console.log(images);
    this.setState({ search });
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.search !== this.state.search) {
      const images = await getImages(this.state.search);

      // console.log(images);

      this.setState({ images });
    }
  }

  render() {
    const { images } = this.state;
    // console.log(images);

    return (
      <Container>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
      </Container>
    );
  }
}
