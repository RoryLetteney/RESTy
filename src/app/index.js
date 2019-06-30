import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './header';
import Footer from './footer';

import './styles.scss';

function App() {
  return (
    <BrowserRouter>
      <Header>
        <h1>RESTy</h1>
      </Header>
      <main>
        <aside>
          <h2>History</h2>
          <ul id="history">

          </ul>
        </aside>
      </main>
      <Footer>
        <section>
          <p>&copy;{new Date().getFullYear()} Code Fellows</p>
        </section>
      </Footer>
    </BrowserRouter>
  );
}

export default App;
