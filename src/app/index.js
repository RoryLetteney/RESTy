import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './header';
import Footer from './footer';
import HistoryItem from './historyItem';
import ApiCall from './apiCall';

import './styles.scss';

class App extends React.Component {

  constructor() {
    super();

    this.state = { history: localStorage['history'] ? JSON.parse(localStorage['history']) : [] };
  }

  updateHistory = () => {
    this.setState({ history: JSON.parse(localStorage['history']) });
  }

  render() {
    return (
      <BrowserRouter>
        <Header>
          <h1>RESTy</h1>
        </Header>
        <main>
          <aside>
            <h2>History</h2>
            <ul id="history">
              {this.state.history.map(item => <HistoryItem id={item.id} method={item.method} host={item.host} path={item.path} />)}
            </ul>
          </aside>
          <ApiCall updateHistory={this.updateHistory} />
        </main>
        <Footer>
          <section>
            <p>&copy;{new Date().getFullYear()} Code Fellows</p>
          </section>
        </Footer>
      </BrowserRouter>
    );
  }
}

export default App;
