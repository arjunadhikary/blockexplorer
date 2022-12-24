import Transaction from './transaction';

export default function LatestTransaction({
  latestTransactions,
  blockTimestamp,
}) {
  return (
    <div
      style={{
        display: 'grid',
        minWidth: '400px',
        marginLeft: '8px',
      }}
    >
      <h3 style={{ textAlign: 'left' }}>Latest Transaction</h3>
      <div>
        {latestTransactions?.map((trx) => {
          return (
            <Transaction
              trx={trx}
              key={trx.transactionIndex.toString()}
              blockTimestamp={blockTimestamp}
            />
          );
        })}
      </div>
      <button className="large-button">View all Transactions</button>
    </div>
  );
}
