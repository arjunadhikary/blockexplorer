import React from 'react';

export default function UserTokens({ tokens }) {
  return (
    <select>
      {tokens?.map((token) => {
        return (
          <option
            value={token.balance}
          >{`${token.token_name}:${token.balance} ${token.token_symbol}`}</option>
        );
      })}
    </select>
  );
}
