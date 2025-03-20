import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getAllTransactions, getSentTransactions, getReceivedTransactions } from '../services/transaction';
import AllTransactionCard from '../components/transactions/AllTransactionCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data1 = await getAllTransactions(); // Verified transactions
        const data2 = await getReceivedTransactions(); // Not Verified
        const data3 = await getSentTransactions(); // Not Verified

        // Add a "source" property to each transaction
        const transactionsWithSource = [
          ...data1.map(transaction => ({ ...transaction, source: 'verified' })),
          ...data2.map(transaction => ({ ...transaction, source: 'not_verified' })),
          ...data3.map(transaction => ({ ...transaction, source: 'not_verified' }))
        ];

        setTransactions(transactionsWithSource);
      } catch (error) {
        toast.error(error.message || 'Failed to fetch transactions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (transactions.length === 0) {
    return (
      <EmptyState 
        title="All Transactions"
        message="No transactions found"
      />
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <AllTransactionCard 
            key={transaction.id || `transaction-${transaction.sending_time}`}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
};

export default AllTransactions;
