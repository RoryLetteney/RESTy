import React from 'react';

import './styles.scss';

export default ({ uniqueId, type }) => {
  return (
    <div className="method">
      <input id={uniqueId} type="radio" name="method" value={type.toLowerCase()} />
      <label htmlFor={uniqueId}>{type}</label>
    </div>
  )
}