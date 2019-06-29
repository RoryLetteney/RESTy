import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './header';

function App() {
  return (
    <BrowserRouter>
      <Header>
        <h2>RESTy</h2>
      </Header>
    </BrowserRouter>
  );
}

export default App;
