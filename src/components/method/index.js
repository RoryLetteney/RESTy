import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

function Method(props) {
  return (
    <div className="method">
      <input id={props.uniqueId} type="radio" name="method" value={props.type.toLowerCase()} defaultChecked={props.method === 'get'} />
      <label htmlFor={props.uniqueId} onClick={props.onClick}>{props.type}</label>
    </div>
  )
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(Method);