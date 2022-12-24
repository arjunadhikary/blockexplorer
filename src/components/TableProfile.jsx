import React from 'react';
import { Link } from 'react-router-dom';
import { LINK_TYPE } from '../utils/linkType';
export default function TableProfile({ transactions }) {
  const parseData = ({ value, key }) => {
    if (key === 'hash' || key === 'to' || key === 'from') {
      return `${value?.slice(0, 10)}... ${value?.slice(-8)}`;
    } else if (key === 'value') {
      return `${parseFloat(value ? value : 0).toFixed(5)} ETH`;
    } else if (key === 'blockNum') {
      return parseInt(value);
    } else {
      return value;
    }
  };
  const parseDataUrl = ({ value, key }) => {
    if (key === 'blockNum') {
      return `${LINK_TYPE['block']}${value}`;
    } else if (key === 'to' || key === 'from') {
      return `${LINK_TYPE['profile']}${value}`;
    } else if (key === 'hash') {
      return `${LINK_TYPE['transaction']}${value}`;
    }
  };

  const mapToShow = {
    'Trx Hash': 'hash',
    Block: 'blockNum',
    To: 'to',
    From: 'from',
    Value: 'value',
  };
  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <thead style={{ backgroundColor: '#ddd', padding: '8px' }}>
        <tr>
          {Object.keys(mapToShow).map((key) => {
            return (
              <th style={{ border: '1px solid #ccc', padding: '12px' }}>
                {key}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {transactions?.map((trx) => {
          return (
            <tr>
              {Object.values(mapToShow).map((key) => {
                return (
                  <td
                    style={{
                      border: '1px solid #ccc',
                      padding: '10px',
                      padding: '8px',
                    }}
                  >
                    <Link
                      className="link-decoration"
                      to={parseDataUrl({ value: trx[key], key })}
                    >
                      {parseData({ value: trx[key], key })}
                    </Link>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
