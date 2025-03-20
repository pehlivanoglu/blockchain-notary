import React from 'react';
import PropTypes from 'prop-types';

const EmptyState = ({ title, message }) => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p className="text-gray-600">{message}</p>
  </div>
);

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default EmptyState;