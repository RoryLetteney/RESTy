import React from 'react';
import uuid from 'uuid';

export const RestyContext = React.createContext();

export default class RestyProvider extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      headers: null,
      body: null,
      textareaDisabled: true,
      method: 'get',
      handleSubmit: this.handleSubmit,
      textareaDisable: this.textareaDisable,
      textareaEnable: this.textareaEnable
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const urlInput = form.url;
    let methods = Object.values(form.children[0].children[1].children);
    methods = methods.slice(0, methods.length - 1);
    methods = methods.map(m => m.children[0]);
    const url = urlInput.value;
    const method = methods.find(m => m.checked === true).value;
    let data = form.requestBody.value;

    switch (method) {
      case 'get':
        await fetch(url)
          .then(res => { this.setState(state => { return { ...state, headers: JSON.stringify(res.headers) } }); return res.json(); })
          .then(res => { console.log(res); return this.setState(state => { return { ...state, body: JSON.stringify(res.results) } }); });
        break;
      default:
        data = data ? JSON.parse(data) : console.error(data);
        await fetch(url, { method, body: data })
          .then(res => { this.setState(state => { return { ...state, headers: JSON.stringify(res.headers) } }); return res.json(); })
          .then(res => { console.log(res); return this.setState(state => { return { ...state, body: JSON.stringify(res.results) } }); });
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


  textareaDisable = async () => {
    await this.setState({ textareaDisabled: true, method: 'get' });
  }

  textareaEnable = async () => {
    await this.setState({ textareaDisabled: false, method: '' });
  }

  render() {
    return (
      <RestyContext.Provider value={this.state}>
        {this.props.children}
      </RestyContext.Provider>
    )
  }
}