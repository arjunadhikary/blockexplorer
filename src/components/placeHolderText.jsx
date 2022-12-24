import React from 'react';

export default function PlaceHolderText({ text, isCircular }) {
  return (
    <div
      className={`data-placeholder ${isCircular ? 'circular-placeholder' : ''}`}
    >
      {text}
    </div>
  );
}
