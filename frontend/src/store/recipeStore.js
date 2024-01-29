import { create } from "zustand";
import axios from "axios";

// Assuming your API base URL is set globally
// axios.defaults.baseURL = 'http://localhost:8000/api';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  pagination: {},
  currentRecipe: null,
  recipeComments: null,
  likedRecipeIds: [],

  fetchRecipes: async () => {
    const token = get().token; // Retrieve the token from the store's state

    try {
      const response = await axios.get("/recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        recipes: response.data.data,
        pagination: {
          currentPage: response.data.current_page,
          lastPage: response.data.last_page,
          perPage: response.data.per_page,
          total: response.data.total,
        },
      });
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      // Handle error appropriately
    }
  },

  fetchRecipeById: async (recipeId) => {
    try {
      // This will fetch a single recipe by ID
      const response = await axios.get(`/recipes/${recipeId}`);
      set({ currentRecipe: response.data });
    } catch (error) {
      console.error(`Failed to fetch recipe ${recipeId}:`, error);
    }
  },

  createRecipe: async (recipeData, token) => {
    try {
      // Assuming you need to be authenticated to create a recipe
      const response = await axios.post("/recipes", recipeData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the auth token in the header
        },
      });
      set((state) => ({ recipes: [...state.recipes, response.data] }));
    } catch (error) {
      console.error("Failed to create recipe:", error);
    }
  },

  updateRecipe: async (recipeId, recipeData, token) => {
    try {
      // Assuming you need to be authenticated to update a recipe
      const response = await axios.put(`/recipes/${recipeId}`, recipeData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the auth token in the header
        },
      });
      set((state) => ({
        recipes: state.recipes.map((recipe) =>
          recipe.id === recipeId ? response.data : recipe
        ),
        currentRecipe: response.data,
      }));
    } catch (error) {
      console.error(`Failed to update recipe ${recipeId}:`, error);
    }
  },

  deleteRecipe: async (recipeId, token) => {
    try {
      // Assuming you need to be authenticated to delete a recipe
      await axios.delete(`/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the auth token in the header
        },
      });
      set((state) => ({
        recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
        currentRecipe: null,
      }));
    } catch (error) {
      console.error(`Failed to delete recipe ${recipeId}:`, error);
    }
  },

  getRecipesByTags: async (tagIds, page = 1) => {
    const token = get().token; // Retrieve the token from the store's state
    const params = new URLSearchParams({ page, per_page: 9 }); // Set items per page to 9

    // If tagIds are provided, append them to the query params
    if (tagIds && tagIds.length) {
      tagIds.forEach((tagId) => params.append("tags[]", tagId));
    }

    try {
      const response = await axios.get(`/recipes/tags?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token in the Authorization header
        },
      });

      set({
        recipes: response.data.data,
        pagination: {
          currentPage: response.data.pagination.current_page,
          lastPage: response.data.pagination.last_page,
          perPage: response.data.pagination.per_page,
          total: response.data.pagination.total,
        },
      });
    } catch (error) {
      console.error("Failed to fetch recipes by tags:", error);
      // Handle error appropriately
    }
  },

  searchRecipes: async (query) => {
    try {
      const response = await axios.get(`/recipes/search`, {
        params: { query },
      });

      // Map the search results to the expected format
      const formattedData = response.data.map((item) => ({
        id: item.id,
        title: item.title,
        difficulty_level: item.difficulty_level,
        description: item.description,
        image: item.image,
        likes_count: item.likes_count || 0,
        comments_count: item.comments_count || 0,
        average_rating: item.average_rating || "0.0000",
        comments: item.comments || [],
      }));

      // Update the store with the formatted data
      set((state) => ({
        ...state,
        recipes: formattedData,
        // Update pagination if it's provided by the API, or reset it
        pagination: {
          currentPage: 1, // Reset to first page or use API-provided value
          lastPage: 1, // Reset to single page or use API-provided value
          perPage: formattedData.length, // Number of items returned
          total: formattedData.length, // Total number of items
        },
      }));
    } catch (error) {
      console.error("Failed to search recipes:", error);
    }
  },

  changePage: async (tagIds, newPage) => {
    const token = get().token; // Retrieve the token from the store's state
    const params = new URLSearchParams({ page: newPage, per_page: 9 });
    if (tagIds && tagIds.length) {
      tagIds.forEach((tagId) => params.append("tags[]", tagId));
    }
    try {
      const response = await axios.get(`/recipes/tags?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        recipes: response.data.data,
        pagination: {
          currentPage: response.data.current_page,
          lastPage: response.data.last_page,
          perPage: response.data.per_page,
          total: response.data.total,
        },
      });
    } catch (error) {
      console.error("Failed to fetch recipes by tags:", error);
    }
  },

  likeRecipe: async (recipeId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`/recipes/${recipeId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token in the Authorization header
        },
      });
      // Assuming your API returns the updated likes count
      set((state) => ({
        recipes: state.recipes.map((r) =>
          r.id === recipeId ? { ...r, likes_count: r.likes_count + 1 } : r
        ),
      }));
    } catch (error) {
      console.error("Failed to like recipe:", error);
    }
  },

  unlikeRecipe: async (recipeId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`/recipes/${recipeId}/unlike`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token in the Authorization header
        },
      });
      // Assuming your API returns the updated likes count
      set((state) => ({
        recipes: state.recipes.map((r) =>
          r.id === recipeId ? { ...r, likes_count: r.likes_count - 1 } : r
        ),
      }));
    } catch (error) {
      console.error("Failed to unlike recipe:", error);
    }
  },

  addLikedRecipeId: (recipeId) => {
    set((state) => {
      const newLikedRecipeIds = state.likedRecipeIds.includes(recipeId)
        ? state.likedRecipeIds
        : [...state.likedRecipeIds, recipeId];
      return { ...state, likedRecipeIds: newLikedRecipeIds };
    });
  },

  // New function to remove a recipe ID from likedRecipeIds
  removeLikedRecipeId: (recipeId) => {
    set((state) => {
      const newLikedRecipeIds = state.likedRecipeIds.filter(
        (id) => id !== recipeId
      );
      return { ...state, likedRecipeIds: newLikedRecipeIds };
    });
  },

  addCommentToRecipe: async (recipeId, commentContent) => {
    try {
      const response = await axios.post(`/recipes/${recipeId}/comments`, {
        content: commentContent,
      });
      // Assuming your API returns the updated comments list
      set((state) => ({
        recipes: state.recipes.map((r) =>
          r.id === recipeId
            ? { ...r, comments: [...r.comments, response.data.comment] }
            : r
        ),
      }));
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  },

  // fetchRecipeComments: async (recipeId) => {
  //   try {
  //     const response = await axios.get(`/recipes/${recipeId}/comments`);
  //     set({ recipeComments: response.data });
  //   } catch (error) {
  //     console.error("Failed to fetch user profile:", error);
  //     // Handle error
  //   }
  // },

  // fetchRecipeLikes: async (recipeId) => {
  //   try {
  //     const response = await axios.get(`/recipes/${recipeId}/comments`);
  //     set({ recipeComments: response.data });
  //   } catch (error) {
  //     console.error("Failed to fetch user profile:", error);
  //     // Handle error
  //   }
  // },
  // Add other recipe-related actions and state as needed
}));

export default useRecipeStore;
