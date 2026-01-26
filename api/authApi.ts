import api from './axiosInstance';

export const authApi = {
  login: async (data: any) => {
    try {
      const response = await api.post('/login', data);
      
      const resData = response.data;

      if (resData.status === false || resData.status === "false") {
        throw new Error(resData.message || 'Login failed');
      }

      return resData; 
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      throw new Error(errorMessage);
    }
  },

  signup: async (data: any) => {
    try {
      const response = await api.post('/register', data);
      
      const resData = response.data;

      if (resData.status === false || resData.status === "false") {
        throw new Error(resData.message || 'Signup failed');
      }

      return resData;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Signup failed';
      throw new Error(errorMessage);
    }
  },
};