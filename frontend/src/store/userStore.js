import { create } from "zustand";
import axios from "axios";

// Set the base URL for your API requests
axios.defaults.baseURL = "http://127.0.0.1:8000/api";

const useUserStore = create((set, get) => ({
  userProfile: [],
  tags: [],
  isAuthenticated: false,
  user: null,
  token: null,

  login: async (credentials) => {
    try {
      const response = await axios.post("/login", credentials);
      const { token, user } = response.data;
      // console.log("Login response:", user); // Debugging log

      set({ isAuthenticated: true, user, token });

      // Optionally store the token in localStorage or cookies
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", true);
      window.location.replace("/");
    } catch (error) {
      console.error("Login failed:", error.response.data);
      localStorage.setItem("isAuthenticated", false);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post("/register", userData);
      set({ user: response.data.user });
      window.location.replace("/login");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      // Handle error
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ isAuthenticated: false, user: null, token: null });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.setItem("isAuthenticated", false);
      // Optionally remove the token from localStorage or cookies
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error
    }
  },

  fetchTags: async () => {
    try {
      // Assuming '/tags' is the route to get all tags
      const response = await axios.get("/tags");
      set({ tags: response.data });
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
      // Handle error
    }
  },

  addTag: async (tagName, token) => {
    try {
      const response = await axios.post(
        "/tags",
        { name: tagName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({ tags: [...state.tags, response.data] }));
    } catch (error) {
      console.error("Failed to add tag:", error);
    }
  },

  attachTagToRecipe: async (recipeId, tagId, token) => {
    try {
      const response = await axios.post(
        `/recipes/${recipeId}/tags`,
        { tag_id: tagId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update your state as needed based on your application logic
    } catch (error) {
      console.error("Failed to attach tag to recipe:", error);
    }
  },

  detachTagFromRecipe: async (recipeId, tagId, token) => {
    try {
      await axios.delete(`/recipes/${recipeId}/tags/${tagId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update your state as needed based on your application logic
    } catch (error) {
      console.error("Failed to detach tag from recipe:", error);
    }
  },

  isAdmin: () => {
    const { user } = useUserStore.getState();
    return user && user.is_admin;
  },

  fetchUserProfile: async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        "/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(("fetchUserProfile", response.data));
      set({ userProfile: response.data });
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      // Handle error
    }
  },

  updateUserProfile: async (userData) => {
    try {
      const response = await axios.put("/user", userData);
      set({ userProfile: response.data });
    } catch (error) {
      console.error("Failed to update user profile:", error);
      // Handle error
    }
  },

  // Add other tag-related actions and state as needed
}));

export default useUserStore;
