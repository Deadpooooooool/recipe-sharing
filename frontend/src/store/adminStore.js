import { create } from 'zustand';
import axios from 'axios';
import useUserStore from './userStore'; // Import the user store to access the token

const useAdminStore = create((set) => ({
  users: [],
  reports: [],
  isAdmin: false,

  fetchAdminData: async () => {
    const token = useUserStore.getState().token; // Retrieve the token from the user store

    try {
      const response = await axios.get('/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ users: response.data });
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }

    try {
      const reportsResponse = await axios.get('/admin/reports', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ reports: reportsResponse.data.reports });
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    }
  },

  handleUserAction: async (userId) => {
    const token = useUserStore.getState().token;
    // Implement your user action logic here
    console.log(`Admin is handling user ${userId}`);
  },

  handleReportAction: async (reportId) => {
    const token = useUserStore.getState().token;
    // Implement your report action logic here
    console.log(`Admin is handling report ${reportId}`);
  },

  checkAdminStatus: () => {
    const { user } = useUserStore.getState();
    set({ isAdmin: user && user.is_admin });
  },
}));

export default useAdminStore;
