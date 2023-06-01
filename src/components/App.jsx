import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from "./Searchbar";

class App extends React.Component {

  render() {
    return (
      <Searchbar/>
    );
  }
};

export default App
