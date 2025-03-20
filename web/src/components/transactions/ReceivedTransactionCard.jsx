import React from 'react';

const ReceivedTransactionCard = ({ transaction, onAccept, onReject }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Sender NID: {transaction.composerNid}
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(transaction.sending_time).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onAccept(transaction)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => onReject(transaction)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Reject
          </button>
        </div>
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
};

export default ReceivedTransactionCard;