import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Form,
  Header,
  SearchButton,
  SearchButtonLabel,
  SearchInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  render() {
    const { handleSubmit, value, handleChange } = this.props;

    return (
      <Header>
        <Form onSubmit={handleSubmit}>
          <SearchButton type="submit">
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
            value={value}
            onChange={handleChange}
          />
        </Form>
      </Header>
    );
  }
}
