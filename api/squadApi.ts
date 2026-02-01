import api from './axiosInstance';

export const squadApi = {
  // POST API to create squads based on category flag
  createSquad: async (type: string, data: any) => {
    const endpoints: Record<string, string> = {
      "Travel Tour": "/travel/store",
      "Movie": "/movie/store",
      "Event": "/event/store",
      "Hangout": "/hangout/store",
    };

    const url = endpoints[type] || '/travel/store';

    try {
      const response = await api.post(url, data);
      const resData = response.data;

      if (resData.status === false || resData.status === "false") {
        throw new Error(resData.message || `Failed to create ${type} squad`);
      }

      return resData;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
      throw new Error(errorMessage);
    }
  },

  // GET API to fetch squads based on category flag
  getSquads: async (type: string, userId: string | number, page: number = 1) => {
    const endpoints: Record<string, string> = {
      "Travel Tour": "/travel/get",
      "Movie": "/movie/get",
      "Event": "/event/get",
      "Hangout": "/hangout/get",
    };

    const url = endpoints[type] || '/travel/get';

    try {
      const response = await api.get(url, {
        params: {
          user_id: userId,
          page: page
        }
      });
      
      const resData = response.data;

      if (resData.status === false || resData.status === "false") {
        throw new Error(resData.message || `Failed to fetch ${type} squads`);
      }

      return resData;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load squads';
      throw new Error(errorMessage);
    }
  },

  // NEW: GET single squad by ID
  getSquadById: async (squadId: string | number, type: string = "Travel Tour") => {
    const endpoints: Record<string, string> = {
      "Travel Tour": "/travel",
      "Movie": "/movie",
      "Event": "/event",
      "Hangout": "/hangout",
    };

    const baseUrl = endpoints[type] || '/travel';
    const url = `${baseUrl}/${squadId}`; 

    try {
      const response = await api.get(url);
      const resData = response.data;

      if (resData.status === false || resData.status === "false") {
        throw new Error(resData.message || `Failed to fetch squad with ID ${squadId}`);
      }

      return resData;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message 
        || error.message 
        || `Failed to load squad details (ID: ${squadId})`;
      throw new Error(errorMessage);
    }
  },
};