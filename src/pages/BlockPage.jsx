import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { alchemy } from './Home';
import Error from '../error.svg';
import 'font-awesome/css/font-awesome.min.css';
import BlockInfo from '../components/BlockInfo';

export const info = {
  block_info:
    'Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block.',
  date_time: 'The date and time at which a block is produced',
  fee_recipient: 'Address receiving fees from transactions in this block',
  gas_used:
    'The total gas used in the block and its percentage of gas filled in the block.',
};
export default function BlockPage() {
  const { id } = useParams();
  const [blockData, setBlockData] = useState({});
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const getBlockData = async () => {
      try {
        if (id === null) throw new Error('no data');
        const data = await alchemy.core.getBlock(parseInt(id));
        setBlockData(data);
        console.log(data);
      } catch (error) {
        console.log('Came here error');
        console.log(error);
        setIsError(true);
      }
    };
    getBlockData();
  }, []);

  return (
    <div className="wrapper" style={{ padding: '8px' }}>
      <h4 className="wrapper" style={{ marginBottom: '12px' }}>
        <span style={{ fontSize: '1.4em' }}>Block:</span>
        <span className="small text-secondary">#{id}</span>
      </h4>
      {isError ? (
        <img src={Error} alt="Error" />
      ) : (
        <div className="wrapper-block" style={{ border: ' 1px solid black' }}>
          <BlockInfo
            name="Block Height"
            data={blockData.number}
            info={info.block_info}
          />

          <BlockInfo
            name="Nonce"
            data={parseInt(blockData?.nonce?.toString())}
          />

          <BlockInfo
            name="TimeStamp"
            info={info.date_time}
            data={new Date(blockData.timestamp).toDateString()}
            isDate={true}
          />
          <BlockInfo
            name="Transaction"
            data={blockData?.transactions?.length}
          />
          <BlockInfo name="Parent Hash" data={blockData?.parentHash} />
          <BlockInfo
            name="Total Difficulty "
            data={parseInt(blockData?._difficulty)}
          />
          <BlockInfo
            name="Size"
            data={blockData.size === undefined ? '0' : blockData.size}
          />

          <BlockInfo name="Gas Used" data={parseInt(blockData.gasUsed)} />

          <BlockInfo
            linkType="profile"
            info={info.fee_recipient}
            name="Fee Recipient"
            data={blockData.miner}
          />

          <BlockInfo
            name="Gas Limit"
            info={info.gas_used}
            data={parseInt(blockData.gasLimit)}
          ></BlockInfo>
        </div>
      )}
    </div>
  );
}
