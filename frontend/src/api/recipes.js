import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Replace with your API base URL

export const fetchRecipes = async () => {
  return axios.get(`${API_BASE_URL}/recipes`);
};

export const fetchRecipeById = async (id) => {
  return axios.get(`${API_BASE_URL}/recipes/${id}`);
};

export const createRecipe = async (recipeData, token) => {
  return axios.post(`${API_BASE_URL}/recipes`, recipeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateRecipe = async (id, recipeData, token) => {
  return axios.put(`${API_BASE_URL}/recipes/${id}`, recipeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteRecipe = async (id, token) => {
  return axios.delete(`${API_BASE_URL}/recipes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
