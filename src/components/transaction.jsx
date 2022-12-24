import React from 'react';
import Badge from './badge';
import { Utils } from 'alchemy-sdk';
import { Link } from 'react-router-dom';
import PlaceHolderText from './placeHolderText';

export const trimAddress = (address) => `0${address.slice(1, 12)}...`;
export default function Transaction({ trx, blockTimestamp }) {
  return (
    <div className="top-view-list">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <PlaceHolderText text="Tx" isCircular={true} />
        <div
          style={{
            paddingLeft: '0.2em',
            display: 'flex',
            alignItems: 'flex-start',

            flexDirection: 'column',
          }}
        >
          <Link
            className="link-decoration"
            style={{ color: 'blue', textDecoration: 'none', textAlign: 'left' }}
            to={`transaction/${trx.hash}`}
          >
            {trimAddress(trx.hash)}
          </Link>
          <strong style={{ color: 'grey' }}>
            {`${new Date(Date.now() - blockTimestamp).getSeconds()} second ago`}
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
        <Link className="link-decoration" to={`profile/${trx.from}`}>
          from: {trimAddress(trx.from)}
        </Link>
        <Link className="link-decoration" to={`profile/${trx.to}`}>
          {` to: ${trimAddress(trx.to)}`}
        </Link>
      </div>
      {/* <Badge amount={Utils.formatEther(trx.value).slice(0, 8)} /> */}
    </div>
  );
}
