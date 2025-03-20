import axios from 'axios';

const API_URL = 'http://localhost:8081';

export const signIn = async (tckn, password) => {
  const nid = tckn;
  try {
    const response = await axios.post(`${API_URL}/signin`, { nid, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('nid', response.data.nid);
      localStorage.setItem('fullName', response.data.fullName);
      localStorage.setItem('phoneNumber', response.data.phoneNumber);
      return response.data;
    }
    throw new Error('Authentication failed');
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const checkAuth = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const response = await axios.get(`${API_URL}/verify-token`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.valid;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('nid');
    localStorage.removeItem('fullName');
    localStorage.removeItem('phoneNumber');
    return false;
  }
};