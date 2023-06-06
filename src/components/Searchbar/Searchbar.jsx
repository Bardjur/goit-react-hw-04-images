import React from "react";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { BiSearchAlt } from 'react-icons/bi';
import { Container, Form, Button, BtnLabel, Input } from './Searchbar.styled';

class Searchbar extends React.Component {
  state = {
    query: ''
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  handleSubmit = e => {
    e.preventDefault();
    const query = this.state.query.trim();

    if (!query) {
      toast.error('please enter a request',{theme: "colored"});
      return
    }
    this.props.onSubmit(query)
  }

  handleChange = e => this.setState({ query: e.target.value });

  render() {
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <BtnLabel>Search</BtnLabel>
            <BiSearchAlt/>
          </Button>

          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value = {this.state.query}
            onChange={this.handleChange}
          />
      </Form>
    </Container>
    )
  }
};

export default Searchbar
