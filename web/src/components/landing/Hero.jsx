import React from 'react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-12 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <svg className="w-20 h-20 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Secure Document Notarization on the Blockchain
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Immutable, transparent, and verifiable document certification using blockchain technology
        </p>
      </div>
    </div>
  );
};

export default Hero;