import React from 'react';

import './styles.scss';

export default ({ uniqueId, type, onClick, method }) => {
  return (
    <div className="method">
      <input id={uniqueId} type="radio" name="method" value={type.toLowerCase()} defaultChecked={method === 'get'} />
      <label htmlFor={uniqueId} onClick={onClick}>{type}</label>
    </div>
  )
}