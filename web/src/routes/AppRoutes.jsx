import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import NewTransaction from '../pages/NewTransaction';
import SentTransactions from '../pages/SentTransactions';
import ReceivedTransactions from '../pages/ReceivedTransactions';
import AllTransactions from '../pages/AllTransactions';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="new-transaction" replace />} />
        <Route path="new-transaction" element={<NewTransaction />} />
        <Route path="sent-transactions" element={<SentTransactions />} />
        <Route path="received-transactions" element={<ReceivedTransactions />} />
        <Route path="all-transactions" element={<AllTransactions />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;