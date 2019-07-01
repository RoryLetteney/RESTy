import React from 'react';

import './styles.scss';

export default ({ method, host, path }) => {
  return (
    <li>
      <span>{method.toUpperCase()}</span>
      <span>{host}</span>
      <span>{path}</span>
    </li>
  )
}