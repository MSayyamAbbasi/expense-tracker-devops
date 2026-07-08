import api from './api';

const dashboardService = {
  getSummary: async (months = 6) => {
    const { data } = await api.get('/dashboard/summary', { params: { months } });
    return data.data;
  },
};

export default dashboardService;
