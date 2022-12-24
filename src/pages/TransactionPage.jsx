import React, { useEffect, useState } from 'react';
import BlockInfo from '../components/BlockInfo';
import { info } from './BlockPage';
import { alchemy } from './Home';
import { useParams } from 'react-router-dom';
import ErrorFile from '../error.svg';
import { Utils } from 'alchemy-sdk';
import { Player } from '@lottiefiles/react-lottie-player';

export default function TransactionPage() {
  const { id } = useParams();
  const [blockData, setBlockData] = useState();
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const getBlockData = async () => {
      try {
        if (!id) throw new Error('no data');
        const tx = await alchemy.core.getTransactionReceipt(id);
        let tx_status = '';
        if (!tx) {
          tx_status = "'Pending or Unknown Transaction";
        } else if (tx.status === 1) {
          tx_status = 'Transaction  successful!';
        } else {
          tx_status = 'Transaction failed!';
        }

        console.log(tx);
        const data = await alchemy.core.getTransaction(id);

        if (data === null) throw new Error('no such transaction data');
        const { timestamp } = await alchemy.core.getBlock(data.blockNumber);
        console.log(timestamp);
        setBlockData({
          ...data,
          timestamp,
          status: tx_status,
          gasUsed: tx.gasUsed ? tx.gasUsed : 0,
        });
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    };
    getBlockData();
  }, []);
  return (
    <>
      {isError && <img src={ErrorFile} alt="Error Page" />}
      <div className="wrapper" style={{ padding: '8px' }}>
        <div className="wrapper" style={{ marginBottom: '12px' }}>
          <span style={{ fontSize: '1.4em' }}>Transaction:</span>
          <span className="small text-secondary">#{id}</span>
        </div>

        {!blockData ? (
          <Player
            src="https://assets7.lottiefiles.com/packages/lf20_x62chJ.json"
            className="player"
            loop
            autoplay
          />
        ) : (
          <div className="wrapper-block" style={{ border: ' 1px solid black' }}>
            {blockData.blockNumber && (
              <BlockInfo
                name="Block Number"
                data={blockData?.blockNumber}
                linkType="block"
              />
            )}

            <BlockInfo
              name="Transaction Status"
              info={info.date_time}
              data={blockData?.status}
              isDate={true}
            />

            <BlockInfo
              name="TimeStamp"
              info={info.date_time}
              data={Date(blockData?.timestamp).toLocaleString()}
              isDate={true}
            />

            <BlockInfo
              name="Value"
              data={
                blockData?.value === undefined
                  ? '0 ethers'
                  : `${Utils.formatEther(blockData?.value)} ethers`
              }
            />
            <BlockInfo
              linkType="address"
              info={info.from}
              name="From"
              data={blockData?.from}
            />
            <BlockInfo
              linkType="address"
              info={info.to}
              name="To"
              data={blockData?.to}
            />

            <BlockInfo
              name="Gas Price"
              data={`${Utils.formatEther(blockData?.gasPrice)} ethers`}
            />
            <BlockInfo name="Gas Used" data={`${blockData?.gasUsed}`} />
            <BlockInfo
              name="Transaction Fee"
              data={`${Utils.formatEther(
                blockData.gasPrice.mul(blockData?.gasUsed)
              )} ethers`}
            />
          </div>
        )}
      </div>
    </>
  );
}
