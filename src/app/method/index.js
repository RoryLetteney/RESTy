import React from 'react';

import './styles.scss';

export default ({ type }) => {
  return (
    <label>
      <input type="radio" name="method" value={type.toLowerCase()} />
      <span>{type}</span>
    </label>
  )
}