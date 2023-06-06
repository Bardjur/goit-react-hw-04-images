import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MagnifyingGlass } from  'react-loader-spinner'
import fetchImages from "services/pixabay-api";
import { Wrapper, Title2 } from "./App.styled";

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";

const perPage = 12;
class App extends React.Component {
  state = {
    images: [],
    status: 'idle',
    error: null,
    query: '',
    page: 1,
    totalPage: 0,
  }

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state
    const isQueryChanged = query !== prevState.query;

    if (page !== prevState.page || isQueryChanged) {
      this.setState({ status: 'pending' });
      this.getImg(query, page, perPage, isQueryChanged);
    }
  }

  getImg = async (query, page, perPage, isQueryChanged) => {
    return await fetchImages(query, page, perPage).then((data) => {
      if (data.total === 0) {
        return Promise.reject(new Error('Nothing was found for your request'));
      }

      const images = isQueryChanged ? [...data.hits] : [...this.state.images, ...data.hits];

      this.setState({
        images,
        totalPage: Math.ceil(data.totalHits / perPage),
        status: 'resolve'
      });
    }).catch(err => {
      this.setState({ error: err.message, status: 'reject' });
    });
  }

  setQueryState = (query) => {
    this.setState({ query, page: 1, error: null });
  }

  setPageState = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 })
  }

  render() {
    const { status, images, error, page, totalPage } = this.state;

    return (
      <Wrapper>
        <Searchbar onSubmit={ this.setQueryState } />

        { status === 'idle' && <Title2>Please enter a request</Title2> }

        { status === 'pending' && <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            glassColor = '#c0efff'
            color = '#3f51b5'
          /> 
        }

        { status === 'reject' && toast.error(error,{theme: "colored"}) && '' }

        { status === 'resolve' && (
            <>
              <ImageGallery images={ images } />
              { page < totalPage && <Button handlerClick={this.setPageState}>Load more</Button>}
            </>
          )
        }

        <ToastContainer autoClose={3000}/>
      </Wrapper>
    );
  }
};

export default App
