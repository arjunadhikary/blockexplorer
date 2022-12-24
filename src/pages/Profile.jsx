import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TableProfile from '../components/TableProfile';
import { alchemy } from './Home';
import { Utils } from 'alchemy-sdk';
import UserTokens from '../components/user-tokens';
import { Player } from '@lottiefiles/react-lottie-player';

const getFormateEther = (value = 0) =>
  parseFloat(Utils.formatEther(value ? value : 0)).toPrecision(5);
export default function Profile() {
  const { id } = useParams();
  const [profileBalance, setProfileBalance] = useState();
  const [currentRate, setCurrentRate] = useState();
  const [transactions, setTransactions] = useState(null);
  const [tokens, setTokens] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const tokenBalances = alchemy.core.getTokenBalances(id);
        const getAsset = alchemy.core.getAssetTransfers({
          fromBlock: '0x0',
          fromAddress: id,
          category: ['external', 'internal', 'erc20', 'erc721', 'erc1155'],
        });

        const getEthValue = fetch(
          `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
        );
        const getBalance = alchemy.core.getBalance(id);
        const [res0, res1, res2, res3] = await Promise.all([
          getEthValue,
          getBalance,
          getAsset,
          tokenBalances,
        ]);

        let tokensObj = [];
        const nonZeroBalanceTokens = res3.tokenBalances.filter(
          (token) => token.tokenBalance !== '0'
        );
        for (let token of nonZeroBalanceTokens) {
          let balance = token.tokenBalance;
          const metadata = await alchemy.core.getTokenMetadata(
            token.contractAddress
          );

          // Compute token balance in human-readable format
          balance = balance / Math.pow(10, metadata.decimals);
          balance = balance.toFixed(2);

          tokensObj.push({
            token_name: metadata.name,
            balance: balance,
            token_symbol: metadata.symbol,
          });
        }
        setTokens(tokensObj);
        setTransactions(
          res2.transfers.length !== 0 ? res2.transfers.slice(-20) : []
        );
        console.log(res2.transfers.length);
        setProfileBalance(res1);
        setCurrentRate((await res0.json()).result.ethusd);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div className="wrapper">
      {!transactions ? (
        <Player
          src="https://assets10.lottiefiles.com/private_files/lf30_fup2uejx.json"
          className="player"
          loop
          autoplay
        />
      ) : (
        <>
          <h3>Address : {id}</h3>
          <div className="user-overview" style={{ marginBottom: '18px' }}>
            <div>
              <span>Balance: </span>
              <span>{`${getFormateEther(profileBalance)} Ethers`}</span>
            </div>
            <div>
              <span>Ether Value: </span>
              <span>
                {getFormateEther(profileBalance) * parseFloat(currentRate) +
                  ' USD'}
              </span>
            </div>
            <div>
              <span>Tokens : </span>
              <UserTokens tokens={tokens} />
            </div>
          </div>

          <TableProfile transactions={transactions} />
        </>
      )}
    </div>
  );
}
