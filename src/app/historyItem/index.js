import React from 'react';

import './styles.scss';

export default ({ method, url, path }) => {
  return (
    <li>
      <span>{method}</span>
      <span>{url}</span>
      <span>{path}</span>
    </li>
  )
}