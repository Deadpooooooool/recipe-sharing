import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Replace with your API base URL

export const fetchUser = async (userId, token) => {
  return axios.get(`${API_BASE_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = async (userId, userData, token) => {
  return axios.put(`${API_BASE_URL}/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = async (userId, token) => {
  return axios.delete(`${API_BASE_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const followUser = async (userIdToFollow, token) => {
  return axios.post(`${API_BASE_URL}/follow/${userIdToFollow}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unfollowUser = async (userIdToUnfollow, token) => {
  return axios.delete(`${API_BASE_URL}/unfollow/${userIdToUnfollow}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserProfile = async (userId, token) => {
    return fetchUser(userId, token); // Reuse fetchUser for the profile
  };
  