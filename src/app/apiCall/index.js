import React from 'react';

import Method from '../method';
import AuthDiv from './authDiv';

export default () => {
  return (
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
            <AuthDiv className="visible-false" title="Basic Authorization">
              <input name="authusername" placeholder="Username" />
              <input name="authpassword" type="authpassword" placeholder="Password" />
            </AuthDiv>
            <AuthDiv className="visible-false" title="Bearer Token">
              <input tpye="text" class="wide" name="authtoken" placeholder="Bearer Token" />
            </AuthDiv>
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
  )
}