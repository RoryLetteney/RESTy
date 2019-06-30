import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './header';
import Footer from './footer';
import HistoryItem from './historyItem';
import Method from './method';

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
            <HistoryItem method="GET" url="swapi.co" path="/api/people" />
            <HistoryItem method="GET" url="swapi.co" path="/api/starships" />
          </ul>
        </aside>
        <section class="deck">
          <form>
            <section>
              <input type="text" class="wide" name="url" placeholder="URL" />
              <div id="methods">
                <Method type="GET" />
                <Method type="POST" />
                <Method type="PUT" />
                <Method type="PATCH" />
                <Method type="DELETE" />
                <label>
                  <button type="submit">Go!</button>
                </label>
              </div>
            </section>
            <section class="deck col-2">
              <div id="body">
                <textarea placeholder="Raw JSON Body" name="requestBody"></textarea>
              </div>
              <div id="headers">
                <button>Headers</button>
                <div class="visible-false">
                  <h2>Basic Authorization</h2>
                  <input name="authusername" placeholder="Username" />
                  <input name="authpassword" type="authpassword" placeholder="Password" />
                </div>
                <div class="visible-false">
                  <h2>Bearer Token</h2>
                  <input tpye="text" class="wide" name="authtoken" placeholder="Bearer Token" />
                </div>
              </div>
            </section>
          </form>
          <div id="json">
            <h3>Headers</h3>
            <div id="response-headers">
            </div>
            <h3>Response</h3>
            <div id="response-body">
            </div>
          </div>
        </section>
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
