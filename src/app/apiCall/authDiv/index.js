import React from 'react';

export default ({ className, title, children }) => {
  return (
    <div class={className}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}