import React from 'react';
import PropTypes from 'prop-types';

const TransactionStatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

TransactionStatusBadge.propTypes = {
  status: PropTypes.string.isRequired
};

export default TransactionStatusBadge;