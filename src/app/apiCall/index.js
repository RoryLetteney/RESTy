import React, { useContext } from 'react';
import { RestyContext } from '../../context';
import uuid from 'uuid/v1';

import Method from '../method';
import AuthDiv from './authDiv';

export default function ApiCall() {
  const { headers, body, textareaDisabled, method, textareaDisable, textareaEnable, handleSubmit } = useContext(RestyContext);

  return (
    <section className="deck">
      <form onSubmit={handleSubmit}>
        <section>
          <input type="text" className="wide" name="url" placeholder="URL" />
          <div id="methods">
            <Method uniqueId={uuid()} type="GET" onClick={textareaDisable} method={method} />
            <Method uniqueId={uuid()} type="POST" onClick={textareaEnable} />
            <Method uniqueId={uuid()} type="PUT" onClick={textareaEnable} />
            <Method uniqueId={uuid()} type="PATCH" onClick={textareaEnable} />
            <Method uniqueId={uuid()} type="DELETE" onClick={textareaEnable} />
            <input type="submit" value="Go!" />
          </div>
        </section>
        <section className="deck col-2">
          <div id="body">
            <textarea placeholder="Raw JSON Body" name="requestBody" disabled={textareaDisabled ? "disabled" : ""}></textarea>
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
          {headers}
        </div>
        <h3>Response</h3>
        <div id="response-body" className="response">
          {body}
        </div>
      </div>
    </section>
  )
}