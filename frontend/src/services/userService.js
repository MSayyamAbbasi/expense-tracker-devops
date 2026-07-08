import api from './api';

const userService = {
  updateProfile: async (updates) => {
    const { data } = await api.patch('/users/profile', updates);
    return data.data;
  },

  changePassword: async ({ currentPassword, newPassword }) => {
    const { data } = await api.patch('/users/password', { currentPassword, newPassword });
    return data;
  },
};

export default userService;
