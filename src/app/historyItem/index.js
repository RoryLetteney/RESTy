import React from 'react';

import './styles.scss';

export default ({ id, method, host, path }) => {
  return (
    <li key={id}>
      <span>{method}</span>
      <span>{host}</span>
      <span>{path}</span>
    </li>
  )
}