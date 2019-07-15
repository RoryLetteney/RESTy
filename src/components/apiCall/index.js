import React from 'react';
// import React, { useContext } from 'react';
import { connect } from 'react-redux';
// import { RestyContext } from '../../context';
import uuid from 'uuid/v1';

import Method from '../method';
import AuthDiv from './authDiv';

function ApiCall(props) {
  // const { headers, body, textareaDisabled, method, textareaDisable, textareaEnable, handleSubmit } = useContext(RestyContext);
  const handleSubmit = async e => {
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
          .then(async res => { let body = await res.json(); return { headers: res.headers, body } })
          .then(res => { console.log(res); props.dispatch({ type: 'RECEIVE', payload: { headers: JSON.stringify(res.headers), body: JSON.stringify(res.body.results) } }) });
        // .then(res => { this.setState(state => { return { ...state, headers: JSON.stringify(res.headers) } }); return res.json(); })
        // .then(res => { console.log(res); return this.setState(state => { return { ...state, body: JSON.stringify(res.results) } }); });
        break;
      default:
        data = data ? JSON.parse(data) : console.error(data);
        await fetch(url, { method, body: data })
          .then(async res => { let body = await res.json(); return { headers: res.headers, body } })
          .then(res => { console.log(res); props.dispatch({ type: 'RECEIVE', payload: { headers: JSON.stringify(res.headers), body: JSON.stringify(res.body.results) } }) });
      // .then(res => { this.setState(state => { return { ...state, headers: JSON.stringify(res.headers) } }); return res.json(); })
      // .then(res => { console.log(res); return this.setState(state => { return { ...state, body: JSON.stringify(res.results) } }); });
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
    props.updateHistory();
  };

  return (
    <section className="deck">
      <form onSubmit={handleSubmit}>
        <section>
          <input type="text" className="wide" name="url" placeholder="URL" />
          <div id="methods">
            <Method uniqueId={uuid()} type="GET" onClick={() => props.dispatch({ type: 'METHOD', payload: 'get' })} method={props.method} />
            <Method uniqueId={uuid()} type="POST" onClick={() => props.dispatch({ type: 'METHOD', payload: 'post' })} />
            <Method uniqueId={uuid()} type="PUT" onClick={() => props.dispatch({ type: 'METHOD', payload: 'put' })} />
            <Method uniqueId={uuid()} type="PATCH" onClick={() => props.dispatch({ type: 'METHOD', payload: 'patch' })} />
            <Method uniqueId={uuid()} type="DELETE" onClick={() => props.dispatch({ type: 'METHOD', payload: 'delete' })} />
            <input type="submit" value="Go!" />
          </div>
        </section>
        <section className="deck col-2">
          <div id="body">
            <textarea placeholder="Raw JSON Body" name="requestBody" disabled={props.textareaDisabled ? "disabled" : ""}></textarea>
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
          {props.headers}
        </div>
        <h3>Response</h3>
        <div id="response-body" className="response">
          {props.body}
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(ApiCall);