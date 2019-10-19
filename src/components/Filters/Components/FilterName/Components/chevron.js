import React from 'react';
import './chevron.css';

const Chevron = (props) => (
  <svg name={props.name} viewBox={'0 0 26 26'} width="10" height="10" title="chevron" fill={'#929292'}>
    <path d="M11.24,7.06.33,18a1,1,0,0,0-.19,1.24,1,1,0,0,0,1.48.16L12.34,8.67a.91.91,0,0,1,1.31,0L24.32,19.33a1,1,0,0,0,1.24.19A1,1,0,0,0,25.72,18l-11-11A2.48,2.48,0,0,0,11.24,7.06Z" />
  </svg>
);

export default Chevron;
