import React from 'react';
import { Link } from 'react-router-dom';
import Badge from './badge';
import PlaceHolderText from './placeHolderText';

export default function Block({ number, totalTrxns, miner, timeStamp }) {
  return (
    <div className="top-view-list">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <PlaceHolderText text="Bk" isCircular={false} />

        <div
          style={{
            paddingLeft: '0.2em',
            display: 'flex',
            alignItems: 'flex-start',

            flexDirection: 'column',
          }}
        >
          <Link
            style={{ color: 'blue', textDecoration: 'none' }}
            to={`/block/${number}`}
          >
            {number}
          </Link>
          <strong style={{ color: 'grey' }}>
            {`${new Date(Date.now() - 1671282107).getSeconds()} second ago`}
          </strong>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          marginInline: 'auto',
          flexDirection: 'column',
          alignItems: 'start',
        }}
      >
        <Link className="link-decoration" to={`/profile/${miner}`}>
          Fee Recipient : {`${miner.slice(0, 8)}...${miner.slice(-4)}`}
        </Link>
        <p> {totalTrxns}</p>
      </div>
      {/* <Badge amount="0.5" /> */}
    </div>
  );
}
