import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getSentTransactions } from '../services/transaction';
import TransactionCard from '../components/transactions/TransactionCard';

const SentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getSentTransactions();
        setTransactions(data);
      } catch (error) {
        toast.error(error.message || 'Failed to fetch transactions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Sent & Pending Transactions</h2>
        <p className="text-gray-600">No transactions found</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Sent & Pending Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionCard 
            key={transaction.id} 
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
};

export default SentTransactions;