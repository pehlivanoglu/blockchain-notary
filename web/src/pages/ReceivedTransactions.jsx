import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getReceivedTransactions, respondToTransaction } from '../services/transaction';
import ReceivedTransactionCard from '../components/transactions/ReceivedTransactionCard';

const ReceivedTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const data = await getReceivedTransactions();
      setTransactions(data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch transactions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAccept = async (transaction) => {
    try {
      await respondToTransaction(transaction, 'accept');
      toast.success('Transaction accepted successfully');
      fetchTransactions(); // Refresh the list
    } catch (error) {
      toast.error(error.message || 'Failed to accept transaction');
    }
  };

  const handleReject = async (transaction) => {
    try {
      await respondToTransaction(transaction, 'reject');
      toast.success('Transaction rejected successfully');
      fetchTransactions(); // Refresh the list
    } catch (error) {
      toast.error(error.message || 'Failed to reject transaction');
    }
  };

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
        <h2 className="text-2xl font-bold mb-4">Received & Pending Transactions</h2>
        <p className="text-gray-600">No transactions found</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Received & Pending Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <ReceivedTransactionCard 
            key={transaction.id} 
            transaction={transaction}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ))}
      </div>
    </div>
  );
};

export default ReceivedTransactions;