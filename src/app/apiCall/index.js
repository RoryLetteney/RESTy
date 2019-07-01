import React from 'react';
import uuid from 'uuid/v1';
import superagent from 'superagent';

import Method from '../method';
import AuthDiv from './authDiv';

export default class ApiCall extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      headers: null,
      body: null,
      textareaDisabled: true,
      method: 'get'
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const urlInput = form.children[0].children[0];
    let methods = Object.values(form.children[0].children[1].children);
    methods = methods.slice(0, methods.length - 1);
    methods = methods.map(m => m.children[0]);
    const url = urlInput.value;
    const method = methods.find(m => m.checked === true).value;
    let data = form.children[1].children[0].children[0].value;

    switch (method) {
      case 'get':
        await superagent(method, url)
          .then(res => this.setState({ headers: JSON.stringify(res.headers), body: JSON.stringify(res.body.results) }));
        break;
      default:
        data = data ? JSON.parse(data) : console.error(data);
        await superagent(method, url)
          .send(data)
          .then(res => this.setState({ headers: JSON.stringify(res.headers), body: JSON.stringify(res.body.results) }));
    }

    const splitURL = url.split('//')[1].split('/');
    let history = localStorage.getItem('history') || [];
    history = typeof history === 'string' ? JSON.parse(history) : history;
    history.unshift({
      id: uuid(),
      method,
      url,
      host:
        splitURL[0],
      path: '/' + splitURL.slice(1).join('/')
    });
    localStorage['history'] = JSON.stringify(history);
    this.props.updateHistory();
  };


  textareaDisable = () => {
    this.setState(state => { state.textareaDisabled = true; state.method = 'get' });
  }

  textareaEnable = () => {
    this.setState(state => { state.textareaDisabled = false; state.method = '' });
  }

  render() {
    return (
      <section className="deck">
        <form onSubmit={this.handleSubmit}>
          <section>
            <input type="text" className="wide" name="url" placeholder="URL" />
            <div id="methods">
              <Method uniqueId={uuid()} type="GET" onClick={this.textareaDisable} method={this.state.method} />
              <Method uniqueId={uuid()} type="POST" onClick={this.textareaEnable} />
              <Method uniqueId={uuid()} type="PUT" onClick={this.textareaEnable} />
              <Method uniqueId={uuid()} type="PATCH" onClick={this.textareaEnable} />
              <Method uniqueId={uuid()} type="DELETE" onClick={this.textareaEnable} />
              <input type="submit" value="Go!" />
            </div>
          </section>
          <section className="deck col-2">
            <div id="body">
              <textarea placeholder="Raw JSON Body" name="requestBody" disabled={this.state.textareaDisabled ? "disabled" : ""}></textarea>
            </div>
            <div id="headers">
              <button type="button">Headers</button>
              <AuthDiv className="visible-false" title="Basic Authorization">
                <input name="authusername" placeholder="Username" />
                <input name="authpassword" type="authpassword" placeholder="Password" />
              </AuthDiv>
              <AuthDiv className="visible-false" title="Bearer Token">
                <input tpye="text" className="wide" name="authtoken" placeholder="Bearer Token" />
              </AuthDiv>
            </div>
          </section>
        </form>
        <div id="json">
          <h3>Headers</h3>
          <div id="response-headers" className="response">
            {this.state.headers}
          </div>
          <h3>Response</h3>
          <div id="response-body" className="response">
            {this.state.body}
          </div>
        </div>
      </section>
    )
  }
}