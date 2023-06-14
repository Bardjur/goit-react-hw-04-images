import React, {useState, useEffect, useRef} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MagnifyingGlass } from  'react-loader-spinner'
import fetchImages from "services/pixabay-api";
import { Wrapper, Title2 } from "./App.styled";

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";

const perPage = 12;

const App = () => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const isQueryChanged = useRef(false);

  useEffect(() => {
    if (query === '') {
      return
    }

    async function getImg() {
      return await fetchImages(query, page, perPage).then((data) => {
        if (data.total === 0) {
          return Promise.reject(new Error('Nothing was found for your request'));
        }

        if (isQueryChanged.current) {
          setImages([...data.hits])
        } else {
          setImages(img => [...img, ...data.hits])
        }

        setTotalPage(Math.ceil(data.totalHits / perPage));
        setStatus('resolve');

      }).catch(err => {
        setError(err.message);
        setStatus('reject');
      }).finally(() => isQueryChanged.current = false);
    }
    
    setStatus('pending');
    getImg();
  }, [query, page]);

  const setQueryState = (queryHandle) => {
    if (queryHandle === query) {
      return
    }

    isQueryChanged.current = true
    setQuery(queryHandle);
    setPage(1);
    setError(null);
  }

  const setPageState = () => {
    setPage(prevPage => prevPage + 1)
  }

  return (
    <Wrapper>
      <Searchbar onSubmit={ setQueryState } />

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
            { page < totalPage && <Button handlerClick={setPageState}>Load more</Button>}
          </>
        )
      }

      <ToastContainer autoClose={3000}/>
    </Wrapper>
  );
};

export default App
