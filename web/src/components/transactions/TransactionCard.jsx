import React from 'react';

const TransactionCard = ({ transaction }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Recipient NID: {transaction.recipientNid}
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(transaction.sending_time).toLocaleString()}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          transaction.status === 'PENDING' 
            ? 'bg-yellow-100 text-yellow-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {transaction.status}
        </span>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-md font-medium text-gray-700">Additional Fields:</h4>
        {Object.entries(transaction.fields || {}).map(([key, value]) => (
          <div key={key} className="flex">
            <span className="font-medium text-gray-600 w-1/3">{key}:</span>
            <span className="text-gray-800">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionCard;