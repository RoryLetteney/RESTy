import { createStore } from 'redux';

let INITIAL_STATE = {
  headers: null,
  body: null,
  textareaDisabled: true,
  method: 'get',
  // handleSubmit: this.handleSubmit
};

function reducer(state = INITIAL_STATE, action) {
  let { type, payload } = action;

  switch (type) {
    case 'RECEIVE':
      return { ...state, headers: payload.headers, body: payload.body };
    case 'METHOD':
      const method = payload;
      return { ...state, method, textareaDisabled: method === 'get' };
    default:
      return state;
  }
}

export default () => createStore(reducer);