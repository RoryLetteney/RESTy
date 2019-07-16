import React from 'react';

import './styles.scss';

export default function Method(props) {
  return (
    <div className="method">
      <input id={props.uniqueId} type="radio" name="method" value={props.type.toLowerCase()} defaultChecked={props.method === 'get'} />
      <label htmlFor={props.uniqueId} onClick={props.onClick}>{props.type}</label>
    </div>
  )
}