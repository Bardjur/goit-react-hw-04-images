import { Container, Form, Button, BtnLabel, Input } from './Searchbar.styled';

const Searchbar = () => (
  <Container>
    <Form>
      <Button type="submit">
        <BtnLabel>Search</BtnLabel>
      </Button>

      <Input
        type="text"
        autocomplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </Form>
  </Container>
);

export default Searchbar