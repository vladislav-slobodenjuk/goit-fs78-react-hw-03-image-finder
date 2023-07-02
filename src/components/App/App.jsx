import React, { Component } from 'react';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    search: '',
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('here it is');
  };

  render() {
    const { search } = this.state;

    return (
      <Container>
        <Searchbar
          handleChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          value={search}
        />
      </Container>
    );
  }
}
