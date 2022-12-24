import React from 'react';
import Block from './block';

export default function LatestBlock({ latestBlocks }) {
  return (
    <div
      style={{
        display: 'grid',
        minWidth: '400px',
        marginLeft: '8px',
      }}
    >
      <h3 style={{ textAlign: 'left' }}>Latest Block</h3>
      <div>
        {latestBlocks?.map((block) => {
          return (
            <Block
              key={block.number}
              timeStamp={block.timestamp}
              miner={block.miner}
              trxLength={block.trxLength}
              number={block.number}
            />
          );
        })}
      </div>
      <button className="large-button">View all Blocks</button>
    </div>
  );
}
