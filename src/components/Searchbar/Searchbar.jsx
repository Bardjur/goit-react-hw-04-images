import React, {useState} from "react";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { BiSearchAlt } from 'react-icons/bi';
import { Container, Form, Button, BtnLabel, Input } from './Searchbar.styled';

const Searchbar = ({onSubmit}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const handleQuery = query.trim();

    if (!handleQuery) {
      toast.error('please enter a request',{theme: "colored"});
      return
    }
    onSubmit(handleQuery)
  }

  const handleChange = e => setQuery(e.target.value);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <BtnLabel>Search</BtnLabel>
          <BiSearchAlt/>
        </Button>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value = {query}
          onChange={handleChange}
        />
      </Form>
    </Container>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Searchbar
