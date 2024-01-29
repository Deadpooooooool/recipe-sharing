import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Replace with your API base URL

export const register = async (userData) => {
  return axios.post(`${API_BASE_URL}/register`, userData);
};

export const login = async (credentials) => {
  return axios.post(`${API_BASE_URL}/login`, credentials);
};

export const logout = async (token) => {
  return axios.post(`${API_BASE_URL}/logout`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
