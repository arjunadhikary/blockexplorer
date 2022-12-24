import React, { useEffect, useState } from 'react';
import Header from '../components/HomeHeader';
import LatestBlock from '../components/latestBlock';
import LatestTransaction from '../components/latestTransaction';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import HomeHeader from '../components/HomeHeader';
import { Player } from '@lottiefiles/react-lottie-player';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);

export default function Home() {
  const [latestBlocks, setLatestBlocks] = useState([]);
  const [blockTimestamp, setBlockTimestamp] = useState('');
  const [latestMinedTransactions, setLatestMinedTransactions] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const latestBlockNumber = await alchemy.core.getBlockNumber('latest');
        console.log(Utils.hexValue(latestBlockNumber));

        const { transactions, timestamp } =
          await alchemy.core.getBlockWithTransactions(latestBlockNumber);
        setLatestMinedTransactions(transactions.slice(0, 5));
        setBlockTimestamp(timestamp);

        let blocks = [];
        for (
          let index = latestBlockNumber;
          index >= latestBlockNumber - 4;
          index--
        ) {
          const { miner, number, gasUsed, transactions, timestamp } =
            await alchemy.core.getBlockWithTransactions(index);
          blocks.push({
            miner,
            number,
            gasUsed,
            trxLength: transactions.length,
            timestamp,
          });
        }

        setLatestBlocks(blocks);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    };
    fetch();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <HomeHeader />
      <div
        className="wrapper"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        }}
      >
        {latestBlocks.length !== 0 ? (
          <LatestBlock latestBlocks={latestBlocks} />
        ) : (
          <Player
            src="https://assets3.lottiefiles.com/private_files/lf30_ebnktzmv.json"
            className="player"
            loop
            autoplay
          />
        )}
        {latestMinedTransactions.length !== 0 ? (
          <LatestTransaction
            latestTransactions={latestMinedTransactions}
            blockTimestamp={blockTimestamp}
          />
        ) : (
          <Player
            src="https://assets3.lottiefiles.com/private_files/lf30_ebnktzmv.json"
            className="player"
            loop
            autoplay
          />
        )}
      </div>
    </div>
  );
}
