import api from './api';

const authService = {
  register: async ({ name, email, password }) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    return data.data;
  },

  login: async ({ email, password }) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data.data;
  },

  logout: async () => {
    const { data } = await api.post('/auth/logout');
    return data;
  },

  getMe: async () => {
    const { data } = await api.get('/auth/me');
    return data.data;
  },
};

export default authService;
