import React from 'react';
import { Icon } from '@iconify/react';

import abs from './abstract-shapes-20.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function HomeHeader() {
  const [linkAddress, setLinkAddress] = useState();
  const navigate = useNavigate();

  const navigateToPage = async () => {
    navigate(linkAddress);
  };
  const getDataType = async (event) => {
    const value = event.target.value;
    console.log(value);
    if (+value.length === 42) {
      setLinkAddress(`/profile/${value}`);
    } else if (+value.length === 66) {
      setLinkAddress(`/transaction/${value}`);
    } else if (+value.length === 8) {
      setLinkAddress(`/block/${value}`);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        background: ` #21325b url(${abs})`,
        height: '8rem',
        padding: '20px',

        flexDirection: 'column',
        alignItems: 'start',
      }}
    >
      <div className="wrapper">
        <h4 style={{ color: 'white', padding: '1rem' }}>
          The Ethereum Blockchain Explorer
        </h4>
        <div
          style={{
            position: 'relative',
            width: '90%',
            maxWidth: '50%',
          }}
        >
          <input
            style={{
              padding: '1em 1em',
              width: '100%',
              outline: 'none',
              borderRadius: '8px',
              border: 'none',
            }}
            onChange={getDataType}
          />
          <button
            onClick={navigateToPage}
            style={{
              display: 'grid',
              placeItems: 'center',
              fontSize: '1.8rem',
              padding: '.1em',
              color: 'white',
              position: 'absolute',
              top: 0,
              right: 0,

              borderRadius: '0 8px 8px 0',
              width: '50px',
              border: 'none',
              backgroundColor: '#3498db',
              height: '100%',
            }}
          >
            <Icon icon="ic:baseline-search" />
          </button>
        </div>
      </div>
    </div>
  );
}
