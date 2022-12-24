import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import { LINK_TYPE, getLinkTypePartial } from '../utils/linkType';

export default function BlockInfo({ name, data, linkType = '', info }) {
  console.log(Object.keys(LINK_TYPE).includes(linkType));
  return (
    <>
      <div className="data-block" style={{ fontSize: '1.1em' }}>
        <div className="flex-row">
          <FontAwesomeIcon icon={faInfoCircle} size={'sm'} title={info} />
          <span>{name}: </span>
        </div>

        {!Object.keys(LINK_TYPE).includes(linkType) ? (
          <div className="textWhiteSpace">{data}</div>
        ) : (
          <Link
            className="link-decoration"
            to={`${getLinkTypePartial(linkType)}${data}`}
          >
            {data}
          </Link>
        )}
      </div>
      <hr style={{ width: '95%' }} />
    </>
  );
}
