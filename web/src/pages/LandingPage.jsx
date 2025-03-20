import React from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import AuthForm from '../components/AuthForm';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Hero />
          <Features />
        </div>
        <div className="order-1 lg:order-2">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;