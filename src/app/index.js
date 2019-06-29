import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './header';

import './styles.scss';

function App() {
  return (
    <BrowserRouter>
      <Header>
        <h1>RESTy</h1>
      </Header>
    </BrowserRouter>
  );
}

export default App;
