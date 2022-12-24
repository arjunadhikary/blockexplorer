import { Icon } from '@iconify/react';
import React from 'react';

export default function Badge({ amount }) {
  return (
    <div className="badge" style={{ marginLeft: 'auto', overflow: 'hidden' }}>
      <span
        style={{
          overflow: 'hidden',
          fontSize: '2.9em',
          position: 'absolute',
          left: 0,
          top: '50%',
          color: 'white',
          transform: 'translate(-70%,-50%)rotate(90deg)',
        }}
      >
        <Icon icon="mdi:triangle" />
      </span>
      <span style={{ whiteSpace: 'nowrap' }}>{`${parseFloat(amount).toFixed(
        3
      )} ETH`}</span>
    </div>
  );
}
