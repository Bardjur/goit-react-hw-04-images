import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from "./ImageGallery";
import { MagnifyingGlass } from  'react-loader-spinner'

import Searchbar from "./Searchbar";
import fetchImages from "services/pixabay-api";
import { Wrapper, Title2 } from "./App.styled";
import Button from "./Button";

const perPage = 12;
class App extends React.Component {
  state = {
    images: [],
    status: 'idle',
    error: null,
    query: '',
    page: 1,
    total: 0,
  }

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state
    
    if (page !== prevState.page || query !== prevState.query) {
      this.setState({ status: 'pending' })
      
      this.getImg(query, page, perPage)
    }
  }

  getImg = async (query, page, perPage) => {
    return await fetchImages(query, page, perPage).then((data) => {
      this.setState({
        images: [...this.state.images, ...data.hits],
        total: data.totalHits,
        status: 'resolve'
      })
    }).catch(err => {
      this.setState({ error: err.message, status: 'reject' })
    });
  }

  setQueryState = (query) => {
    this.setState({ query, page: 1 })
    
  }

  setPageState = () => {
    const {page} = this.state
    this.setState({ page: page + 1 })
  }

  render() {
    
    const { status, images, error } = this.state;
    return (
      <Wrapper>
        <Searchbar onSubmit={this.setQueryState} />

        {
          status === 'idle' && <Title2>Please enter a request</Title2>
        }

        {
          status === 'pending' && <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            glassColor = '#c0efff'
            color = '#3f51b5'
          />
        }

        {
          status === 'reject' && toast.error(error,{theme: "colored"}) && ''
        }

        {
          status === 'resolve' && (
            <>
              <ImageGallery images={ images } />
              <Button handlerClick={this.setPageState}>Load more</Button>
            </>
          )
        }

        <ToastContainer autoClose={3000}/>
      </Wrapper>
    );
  }
};

export default App
