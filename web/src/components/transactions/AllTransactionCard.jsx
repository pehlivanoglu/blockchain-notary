import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils/dateUtils';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const AllTransactionCard = ({ transaction }) => {
  const isVerified = transaction.source === 'verified';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="mb-2">
            <span className="text-sm text-gray-500">Sender NID:</span>
            <h3 className="text-lg font-semibold text-gray-900">
              {transaction.composerNid}
            </h3>
          </div>
          <div className="mb-2">
            <span className="text-sm text-gray-500">Recipient NID (You):</span>
            <h3 className="text-lg font-semibold text-gray-900">
              {transaction.recipientNid}
            </h3>
          </div>
          <div className="mb-2">
            <span className="text-sm text-gray-500">Agreement Key:</span>
            <h3 className="text-lg font-semibold text-gray-900">
              {transaction.agreementKey}
            </h3>
          </div>
          <div className="mb-2">
            <span className="text-sm text-gray-500">IPFS CID:</span>
            <h3 className="text-lg font-semibold text-gray-900">
              {transaction.ipfs_cid}
            </h3>
          </div>
          <p className="text-sm text-gray-500">
            {formatDate(transaction.sending_time)}
          </p>
        </div>
        <div className="flex items-center">
          {isVerified ? (
            <div className="flex items-center text-green-500">
              <FaCheckCircle className="mr-2" />
              <span className="text-sm font-medium">Verified</span>
            </div>
          ) : (
            <div className="flex items-center text-red-500">
              <FaTimesCircle className="mr-2" />
              <span className="text-sm font-medium">Not Verified</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-md font-medium text-gray-700">Additional Fields:</h4>
        {Object.entries(transaction.fields || {}).map(([key, value], index) => (
          <div key={`${transaction.id}-field-${key}-${index}`} className="flex">
            <span className="font-medium text-gray-600 w-1/3">{key}:</span>
            <span className="text-gray-800">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

AllTransactionCard.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string,
    composerNid: PropTypes.string.isRequired,
    recipientNid: PropTypes.string.isRequired,
    sending_time: PropTypes.string.isRequired,
    ipfs_cid: PropTypes.string.isRequired,
    agreementKey: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired, // "verified" or "not_verified"
    fields: PropTypes.object
  }).isRequired
};

export default AllTransactionCard;
