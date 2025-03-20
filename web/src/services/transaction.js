import axios from 'axios';

const API_URL = 'http://localhost:8081';

export const createTransaction = async (transactionData) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.post(
      `${API_URL}/transactionRequest`,
      transactionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getSentTransactions = async () => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.get(
      `${API_URL}/transactionRequest`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          type: 'sent'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const respondToTransaction = async (transaction, action) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.post(
      `${API_URL}/transaction`,
      {
        ...transaction,
        action
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getReceivedTransactions = async () => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.get(
      `${API_URL}/transactionRequest`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          type: 'received'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllTransactions = async () => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.get(
      `${API_URL}/transaction`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyTransaction = async (transactionId) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.get(
      `${API_URL}/verifyTransaction/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};